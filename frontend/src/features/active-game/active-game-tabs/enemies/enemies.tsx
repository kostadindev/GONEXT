import React from "react";
import { SummonerOverview } from "../../../summoner-cards/sumoner-overview";
import { Summoner } from "../../../../libs/league/league-types";
import { MatchHistory } from "../../../match-history/match-history";
import { Tips } from "../../../tips/tips";

interface EnemiesProps {
  enemy: Summoner | null;
  searchedSummoner: Summoner | null;
  region: string;
}

export const Enemies: React.FC<EnemiesProps> = ({
  enemy,
  searchedSummoner,
  region,
}) => {
  return (
    <>
      {enemy && <SummonerOverview summoner={enemy} region={region} />}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner && enemy && (
            <MatchHistory summoner={enemy} region={region} />
          )}
        </div>
        <div className="w-1/2 mx-0">
          {/* {searchedSummoner && enemy && (
            <Tips
              myChampion={searchedSummoner.championName}
              otherChampion={enemy.championName}
              tipsType="enemy"
            />
          )} */}
        </div>
      </div>
    </>
  );
};
