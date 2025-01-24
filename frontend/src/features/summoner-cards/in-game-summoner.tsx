import { Avatar, Card, theme, Tooltip } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
} from "../../libs/league/league-utils";

export const InGameSummoner = ({
  summoner,
  game,
}: {
  summoner: Summoner;
  game: any;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const handleCardClick = () => {
    navigate(`${location.pathname}?view=${summoner.puuid}`);
  };
  const borderColor =
    summoner.puuid === game.searchedSummoner.puuid
      ? "#e89a3c"
      : summoner.teamId === 100
      ? "#65a9f3"
      : "#e84749";

  return (
    <Card
      style={{
        height: "7vh",
        width: 300,
      }}
      hoverable
      className={`flex items-center border-l-8 border-l-[${borderColor}]`}
      onClick={handleCardClick}
    >
      <div className="h-full flex items-center gap-2">
        <Tooltip title={`${summoner.championName}`}>
          <Avatar
            src={getChampionIconSrc(summoner.championImageId)}
            size="large"
            shape="square"
            alt={summoner.championName}
          />
        </Tooltip>
        <div className="flex flex-col gap-1">
          <Tooltip title={`${summoner.summonerSpell1Name}`}>
            <Avatar
              src={getSummonerSpellIconSrc(summoner.summonerSpell1Name)}
              size={20}
              shape="square"
              alt={summoner.summonerSpell1Name}
            />
          </Tooltip>
          <Tooltip title={`${summoner.summonerSpell2Name}`}>
            <Avatar
              src={getSummonerSpellIconSrc(summoner.summonerSpell2Name)}
              size={20}
              shape="square"
              alt={summoner.summonerSpell2Name}
            />
          </Tooltip>
        </div>
        <div className="flex flex-col">
          <Tooltip title="Summoner Name">
            <span className="font-medium">
              {summoner.summonerName || summoner?.riotId}
            </span>
          </Tooltip>
          <Tooltip title={`Champion: ${summoner.championName}`}>
            <span className="text-gray-500"> {summoner.championName}</span>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};
