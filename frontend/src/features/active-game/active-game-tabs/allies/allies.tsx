import React from "react";
import { Summoner } from "../../../../libs/league/league-types";
import { MatchHistory } from "../../../match-history/match-history";
import { Tips } from "../../../tips/tips";
import { SummonerOverview } from "../../../summoner-cards/sumoner-overview";

interface AlliesProps {
  summoners?: Summoner[];
  allyPuuid?: string;
  searchedSummonerPuuid?: string;
}

export const Allies: React.FC<AlliesProps> = ({
  summoners,
  allyPuuid,
  searchedSummonerPuuid,
}) => {
  const ally = summoners?.find((summoner) => summoner.puuid === allyPuuid);
  const searchedSummoner = summoners?.find(
    (summoner) => summoner.puuid === searchedSummonerPuuid
  );

  return (
    <>
      {ally && <SummonerOverview summoner={ally} />}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner && ally && <MatchHistory summoner={ally} />}
        </div>
        <div className="w-1/2 mx-0">
          {searchedSummoner && ally && (
            <Tips searchedSummoner={searchedSummoner} otherSummoner={ally} />
          )}
        </div>
      </div>
    </>
  );
};
