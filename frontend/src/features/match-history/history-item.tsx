import { Avatar, Card, Badge, Tooltip } from "antd";
import { formatDistanceToNow } from "date-fns";
import { formatGameDurationFromMs } from "../../libs/general/utilities";
import { Summoner, GameHistory } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
  getItemIconSrcById,
} from "../../libs/league/league-utils";

const SMALL_ICON_SIZE = 20;

const MiniSummonerDisplay: React.FC<{ summoner: Summoner }> = ({
  summoner,
}) => (
  <div key={summoner?.summonerName} className="flex items-center w-full">
    <Tooltip title={`Champion: ${summoner?.championImageId || "Unknown"}`}>
      <Avatar
        src={getChampionIconSrc(summoner?.championImageId)}
        alt={summoner?.summonerSpell1Name}
        size={18}
        shape="square"
      />
    </Tooltip>
    <div className="ml-2 flex-1 min-w-0">
      <Tooltip title={summoner.summonerName}>
        <span
          className="block truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "gray",
          }}
        >
          {summoner.summonerName}
        </span>
      </Tooltip>
    </div>
  </div>
);

const GameInfo: React.FC<{
  game: GameHistory;
  timeAgo: string;
  gameDurationString: string;
}> = ({ game, timeAgo, gameDurationString }) => (
  <div className="w-[120px] mb-3 md:mb-0">
    <div>
      <span className="font-medium">{game?.queueName}</span>
      <div className="mb-1">{timeAgo}</div>
    </div>
    <div>
      <div className="font-small">{game?.win ? "Victory" : "Defeat"}</div>
      <div>{gameDurationString}</div>
    </div>
  </div>
);

const ParticipantInfo: React.FC<{ game: GameHistory; kda: string }> = ({
  game,
  kda,
}) => (
  <div className="flex items-left justify-center flex-col">
    <div className="flex gap-4">
      <div className="flex gap-1">
        <Badge>
          <Tooltip title={`${game?.participant?.championImageId || "Unknown"}`}>
            <Avatar
              src={getChampionIconSrc(game?.participant?.championImageId)}
              size="large"
              shape="square"
            />
          </Tooltip>
        </Badge>
        <div className="flex flex-col">
          <Tooltip
            title={`${game?.participant?.summonerSpell1Name || "Unknown"}`}
          >
            <Avatar
              src={getSummonerSpellIconSrc(
                game?.participant?.summonerSpell1Name
              )}
              shape="square"
              alt={game?.participant?.summonerSpell1Name}
              size={SMALL_ICON_SIZE}
            />
          </Tooltip>
          <Tooltip
            title={`${game?.participant?.summonerSpell2Name || "Unknown"}`}
          >
            <Avatar
              src={getSummonerSpellIconSrc(
                game?.participant?.summonerSpell2Name
              )}
              shape="square"
              alt={game?.participant?.summonerSpell2Name}
              size={SMALL_ICON_SIZE}
            />
          </Tooltip>
        </div>
      </div>
      <div className="min-w-[80]">
        <Tooltip title="Kills/Deaths/Assists">
          <div className="text-md flex justify-center items-center">
            <span>{game?.participant?.kills}</span>/
            <span className="text-[#e84749]">{game?.participant?.deaths}</span>/
            <span>{game?.participant?.assists}</span>
          </div>
        </Tooltip>
        <Tooltip title="(Kills + Assists) / Deaths">
          <div className="flex justify-center text-gray-500">{kda}</div>
        </Tooltip>
      </div>
    </div>

    <div className="flex gap-0.5 pt-2">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <Tooltip
          key={item}
          title={`Item ${(game?.participant as any)?.[`item${item}`] || "N/A"}`}
        >
          <Avatar
            src={getItemIconSrcById(
              (game?.participant as any)?.[`item${item}`]
            )}
            alt={(game?.participant as any)?.[`item${item}`]}
            size={SMALL_ICON_SIZE}
            shape="square"
          />
        </Tooltip>
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
  const timeAgo = game?.gameCreation
    ? formatDistanceToNow(new Date(game.gameCreation), { addSuffix: true })
    : "";
  const gameDurationString = game
    ? formatGameDurationFromMs(game.gameDuration)
    : "N/A";
  const borderColorClass = game?.win
    ? "border-l-8 border-l-[#65a9f3]"
    : "border-l-8 border-l-[#e84749]";
  const blueTeam = game?.participants?.filter(
    (participant) => participant.teamId === 100
  );
  const redTeam = game?.participants?.filter(
    (participant) => participant.teamId === 200
  );
  const kda = `${(
    (game?.participant?.kills + game?.participant?.assists) /
    game?.participant?.deaths
  ).toFixed(2)}:1`;

  return (
    <Card
      className={`${borderColorClass} p-0 m-0`}
      hoverable
      styles={{
        body: {
          padding: "8px 16px",
        },
      }}
    >
      <div className="flex md:flex-row text-xs justify-between">
        <GameInfo
          game={game}
          timeAgo={timeAgo}
          gameDurationString={gameDurationString}
        />
        <ParticipantInfo game={game} kda={kda} />
      </div>
    </Card>
  );
};
