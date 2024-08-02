import { Avatar, Card, Typography, Badge } from "antd";
import { formatDistanceToNow } from "date-fns";
import { formatGameDurationFromMs } from "../../libs/general/utilities";
import { Summoner, GameHistory } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
  getItemIconSrc,
} from "../../libs/league/league-utils";

const ITEM_ICON_SIZE = 25;

const MiniSummonerDisplay: React.FC<{ summoner: Summoner }> = ({
  summoner,
}) => (
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

const GameInfo: React.FC<{
  game: GameHistory;
  timeAgo: string;
  gameDurationString: string;
}> = ({ game, timeAgo, gameDurationString }) => (
  <div className="w-[100px] mb-3 md:mb-0">
    <Typography.Title level={5} style={{ margin: 0 }}>
      {game?.queueName}
    </Typography.Title>
    <div className="mb-3">{timeAgo}</div>
    <div>{game?.win ? "Victory" : "Defeat"}</div>
    <div>{gameDurationString}</div>
  </div>
);

const ParticipantInfo: React.FC<{ game: GameHistory; kda: string }> = ({
  game,
  kda,
}) => (
  <div className="w-[200px] flex items-left justify-center flex-col">
    <div className="flex gap-1">
      <Badge>
        <Avatar
          src={getChampionIconSrc(game?.participant?.championName)}
          size="large"
        />
      </Badge>
      <div className="flex flex-col">
        <Avatar
          src={getSummonerSpellIconSrc(game?.participant?.summonerSpell1Name)}
          alt={game?.participant?.summonerSpell1Name}
          size={20}
        />
        <Avatar
          src={getSummonerSpellIconSrc(game?.participant?.summonerSpell2Name)}
          alt={game?.participant?.summonerSpell2Name}
          size={20}
        />
      </div>
      <div className="min-w-[80]">
        <div className="text-base flex justify-center items-center">
          <span>{game?.participant?.kills}</span>/
          <span className="text-red-500">{game?.participant?.deaths}</span>/
          <span>{game?.participant?.assists}</span>
        </div>
        <div className="flex justify-center text-gray-500">{kda}</div>
      </div>
    </div>

    <div className="flex gap-0.5 pt-2">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <Avatar
          key={item}
          src={getItemIconSrc((game?.participant as any)[`item${item}`])}
          alt={(game?.participant as any)[`item${item}`]}
          size={ITEM_ICON_SIZE}
          shape="square"
        />
      ))}
    </div>
  </div>
);

const TeamDisplay: React.FC<{ team: Summoner[] }> = ({ team }) => (
  <div className="w-full md:w-1/2">
    {team?.map((summoner) => (
      <MiniSummonerDisplay key={summoner.summonerName} summoner={summoner} />
    ))}
  </div>
);

export const HistoryItem: React.FC<{ game: GameHistory }> = ({ game }) => {
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
    (participant) => participant.teamId === 100
  );
  const redTeam = game?.participants?.filter(
    (participant) => participant.teamId === 200
  );
  const kda = `${(
    (game?.participant?.kills + game?.participant?.assists) /
    game?.participant?.deaths
  ).toFixed(2)}:1 KDA`;

  return (
    <Card className={`${borderColorClass}`} styles={{ body: { padding: 12 } }}>
      <div className="flex flex-col md:flex-row text-xs justify-between">
        <GameInfo
          game={game}
          timeAgo={timeAgo}
          gameDurationString={gameDurationString}
        />
        <ParticipantInfo game={game} kda={kda} />
        <div className="w-[225px] flex flex-col">
          <div className="flex flex-wrap">
            <TeamDisplay team={redTeam} />
            <TeamDisplay team={blueTeam} />
          </div>
        </div>
      </div>
    </Card>
  );
};
