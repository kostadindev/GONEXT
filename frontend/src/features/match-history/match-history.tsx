import { useState, useEffect } from "react";
import { Avatar, Card, Spin, Typography } from "antd";
import { GameHistory, Summoner } from "../../libs/league/league-types";
import { getMatchHistory } from "../../libs/league/league-apis";
import { formatDistanceToNow } from "date-fns";
import { formatGameDurationFromMs } from "../../libs/general/utilities";
import { getChampionIconSrc } from "../../libs/league/league-utils";

const MiniSummonerDisplay: React.FC<{ summoner: Summoner }> = ({
  summoner,
}) => {
  return (
    <div key={summoner?.summonerName} className="flex items-center w-full">
      <Avatar
        src={getChampionIconSrc(summoner?.championName)}
        alt={summoner?.summonerSpell1Name}
        size={20}
      />
      <div className="ml-2 flex-1 min-w-0">
        <span
          className="block truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {summoner.summonerName}
        </span>
      </div>
    </div>
  );
};

const HistoryBlock: React.FC<{ game: GameHistory }> = ({ game }) => {
  const timeAgo = game
    ? formatDistanceToNow(new Date(game.gameCreation), { addSuffix: true })
    : "";
  const gameDurationString = game
    ? formatGameDurationFromMs(game.gameDuration)
    : "N/A";

  const borderColorClass = game?.win
    ? "border-l-8 border-l-[#99ccff]"
    : "border-l-8 border-l-[#ff9999]";

  const blueTeam = game?.participants?.filter(
    (participants) => participants.teamId === 100
  );

  const redTeam = game?.participants?.filter(
    (participant) => participant.teamId === 200
  );

  return (
    <Card className={`${borderColorClass}`} styles={{ body: { padding: 12 } }}>
      <div className="flex flex-col md:flex-row text-xs">
        <div className="md:w-2/6 mb-3 md:mb-0">
          <Typography.Title level={5} style={{ margin: 0 }}>
            {game?.queueName}
          </Typography.Title>
          <div className="mb-3">{timeAgo}</div>
          <div>{game?.win ? "Victory" : "Defeat"}</div>
          <div>{gameDurationString}</div>
        </div>
        <div className="md:w-2/6"></div>
        <div className="md:w-2/6 flex flex-col">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              {redTeam.map((summoner) => (
                <MiniSummonerDisplay
                  key={summoner.summonerName}
                  summoner={summoner}
                />
              ))}
            </div>
            <div className="w-full md:w-1/2">
              {blueTeam.map((summoner) => (
                <MiniSummonerDisplay
                  key={summoner.summonerName}
                  summoner={summoner}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface MatchHistoryProps {
  summoner: Summoner;
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ summoner }) => {
  const [games, setGames] = useState<GameHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      setIsLoading(true);
      const history = await getMatchHistory("na1", summoner.puuid);
      if (isMounted) {
        setGames(history || []);
        setIsLoading(false);
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, [summoner]);

  return (
    <div className="pt-3 pr-3 rounded-lg flex flex-col">
      <div className="text-lg font-bold mb-2">
        {`${summoner.championName}'s Match History`}
      </div>
      <Spin spinning={isLoading}>
        <div
          className="flex-1 overflow-y-auto grid grid-cols-1 gap-2"
          style={{ height: "calc(70vh - 79px)" }}
        >
          {games.map((game, index) => (
            <HistoryBlock
              key={`${summoner?.championId}-${index}`}
              game={game}
            />
          ))}
        </div>
      </Spin>
    </div>
  );
};
