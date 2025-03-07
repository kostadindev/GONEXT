import { Avatar, Card, theme, Tooltip, Skeleton } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
} from "../../libs/league/league-utils";

export const InGameSummoner = ({
  summoner,
  game,
  loading = false,
}: {
  summoner: Partial<Summoner>;
  game: any;
  loading?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const handleCardClick = () => {
    navigate(`${location.pathname}?view=${summoner.puuid}`);
  };
  const borderColor =
    summoner.puuid === game?.searchedSummoner?.puuid
      ? "#e89a3c"
      : summoner.teamId === 100
      ? "#65a9f3"
      : "#e84749";

  return (
    <Card
      style={{
        height: "7vh",
        width: 300,
        borderLeft: `8px solid ${borderColor}`, // Inline style for dynamic border color
      }}
      hoverable={!loading}
      className="flex items-center"
      onClick={!loading ? handleCardClick : undefined}
    >
      {loading ? (
        <div className="h-full flex items-center gap-2 w-full">
          <Skeleton.Avatar active size="large" shape="square" />
          <div className="flex flex-col gap-1">
            <Skeleton.Avatar active size={20} shape="square" />
            <Skeleton.Avatar active size={20} shape="square" />
          </div>
          <div className="flex flex-col w-full gap-1">
            <Skeleton.Input active style={{ width: 100, height: 18 }} />
            <Skeleton.Input
              active
              size="small"
              style={{ width: 80, height: 18 }}
            />
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center gap-2">
          <Tooltip title={`${summoner.championName}`}>
            <Avatar
              src={getChampionIconSrc(summoner.championImageId || "")}
              size="large"
              shape="square"
              alt={summoner.championName}
            />
          </Tooltip>
          <div className="flex flex-col gap-1">
            <Tooltip title={`${summoner.summonerSpell1Name}`}>
              <Avatar
                src={getSummonerSpellIconSrc(summoner.summonerSpell1Name || "")}
                size={20}
                shape="square"
                alt={summoner.summonerSpell1Name}
              />
            </Tooltip>
            <Tooltip title={`${summoner.summonerSpell2Name}`}>
              <Avatar
                src={getSummonerSpellIconSrc(summoner.summonerSpell2Name || "")}
                size={20}
                shape="square"
                alt={summoner.summonerSpell2Name}
              />
            </Tooltip>
          </div>
          <div className="flex flex-col">
            <Tooltip
              title={
                (summoner.summonerName || summoner?.riotId)?.split("#")?.[0]
              }
            >
              <span className="font-medium truncate w-32 block">
                {(summoner.summonerName || summoner?.riotId)?.split("#")?.[0]}
              </span>
            </Tooltip>
            <Tooltip title={summoner.championName}>
              <span className="text-gray-500"> {summoner.championName}</span>
            </Tooltip>
          </div>
        </div>
      )}
    </Card>
  );
};
