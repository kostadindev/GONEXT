import { Card } from "antd";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
} from "../../libs/league/league-utils";

export const InGameSummoner = ({ summoner }: { summoner: Summoner }) => {
  const colorGradient =
    summoner.teamId === 100
      ? "linear-gradient(to left, #e2e8f0, #99ccff)"
      : "linear-gradient(to left, #e2e8f0, #ff9999)";

  console.log("summoner", summoner);
  return (
    <>
      <Card
        style={{
          height: 55,
          width: 300,
          background: colorGradient,
        }}
        hoverable
        className="flex items-center"
        onClick={() => {}}
      >
        <div className="h-full flex items-center pl-3 pr-3 gap-2">
          <img
            src={getChampionIconSrc(summoner?.championName)}
            width={40}
            height={40}
            alt={summoner?.championName}
            className="rounded-full overflow-hidden"
          />
          <div className="flex flex-col gap-1">
            <img
              src={getSummonerSpellIconSrc(summoner?.summonerSpell1Name)}
              width={15}
              height={15}
              alt={summoner?.summonerSpell1Name}
              className="rounded-md overflow-hidden"
            />
            <img
              src={getSummonerSpellIconSrc(summoner?.summonerSpell2Name)}
              width={15}
              height={15}
              alt={summoner?.summonerSpell2Name}
              className="rounded-md overflow-hidden"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-md flex">{summoner?.summonerName}</span>
            <span className="text-gray-500 text-xs">
              {summoner?.championName}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};
