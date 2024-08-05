import { Avatar, Card, Typography } from "antd";
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
  const isAlly = summoner.teamId === game.searchedSummoner.teamId;

  const handleCardClick = () => {
    navigate(`${location.pathname}?view=${summoner.puuid}`);
  };

  const colorGradient = isAlly
    ? "linear-gradient(to left, #e2e8f0, #99ccff)"
    : "linear-gradient(to left, #e2e8f0, #ff9999)";

  return (
    <Card
      style={{
        height: "7vh",
        width: 300,
        background: colorGradient,
      }}
      hoverable
      className="flex items-center"
      onClick={handleCardClick}
    >
      <div className="h-full flex items-center gap-2">
        <Avatar
          src={getChampionIconSrc(summoner.championName)}
          size="large"
          alt={summoner.championName}
        />
        <div className="flex flex-col gap-1">
          <Avatar
            src={getSummonerSpellIconSrc(summoner.summonerSpell1Name)}
            size={20}
            alt={summoner.summonerSpell1Name}
          />
          <Avatar
            src={getSummonerSpellIconSrc(summoner.summonerSpell2Name)}
            size={20}
            alt={summoner.summonerSpell2Name}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium ">
            {summoner.summonerName || summoner?.riotId}
          </span>
          <span className="text-gray-500"> {summoner.championName}</span>
        </div>
      </div>
    </Card>
  );
};
