import React from "react";
import { Summoner } from "../../../../libs/league/league-types";
import { MatchHistory } from "../../../match-history/match-history";
import { SummonerOverview } from "../../../summoner-cards/sumoner-overview";
import { Tips } from "../../../tips/tips";

interface AlliesProps {
  ally: Summoner | null;
  searchedSummoner: Summoner | null;
  region: string;
}

export const Allies: React.FC<AlliesProps> = ({
  ally,
  searchedSummoner,
  region,
}) => {
  return (
    <>
      {ally && <SummonerOverview summoner={ally} region={region} />}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner && ally && (
            <MatchHistory summoner={ally} region={region} />
          )}
        </div>
        <div className="w-1/2 mx-0">
          {/* {searchedSummoner && ally && (
            <Tips
              firstChampion={searchedSummoner.championName}
              secondChampion={ally.championName}
              tipsType="ally"
            />
          )} */}
        </div>
      </div>
    </>
  );
};
