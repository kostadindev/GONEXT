import React from "react";
import { Summoner } from "../../../../libs/league/league-types";
import { MatchHistory } from "../../../match-history/match-history";
import { Tips } from "../../../tips/tips";
import { SummonerOverview } from "../../../summoner-cards/sumoner-overview";

interface EnemyTeamTabProps {
  summoners?: Summoner[];
  enemyPuuid?: string;
  searchedSummonerPuuid?: string;
}

export const Enemies: React.FC<EnemyTeamTabProps> = ({
  summoners,
  enemyPuuid,
  searchedSummonerPuuid,
}) => {
  const enemy = summoners?.find((summoner) => summoner.puuid === enemyPuuid);
  const searchedSummoner = summoners?.find(
    (summoner) => summoner.puuid === searchedSummonerPuuid
  );

  return (
    <>
      {enemy && <SummonerOverview summoner={enemy} />}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner && enemy && <MatchHistory summoner={enemy} />}
        </div>
        <div className="w-1/2 mx-0">
          {searchedSummoner && enemy && (
            <Tips searchedSummoner={searchedSummoner} otherSummoner={enemy} />
          )}
        </div>
      </div>
    </>
  );
};
