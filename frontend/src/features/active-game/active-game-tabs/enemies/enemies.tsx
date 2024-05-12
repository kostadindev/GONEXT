import { Summoner } from "../../../../libs/league/league-types";
import { MatchHistory } from "../../../match-history/match-history";
import { Matchup } from "../../../matchup/matchup";
import { SummonerOverview } from "../../../summoner-cards/sumoner-overview";

interface EnemyTeamTabProps {
  summoners: Summoner[] | undefined;
  enemyPuuid: string | undefined;
  searchedSummonerPuuid: string | undefined;
}

export const Enemies = ({
  summoners,
  enemyPuuid,
  searchedSummonerPuuid,
}: EnemyTeamTabProps) => {
  // Access the selected player using the selectedIndex
  const enemy = summoners?.find(
    (summoner) => summoner.puuid === enemyPuuid
  ) as Summoner;

  const searchedSummoner = summoners?.find(
    (summoner) => summoner.puuid === searchedSummonerPuuid
  ) as Summoner;

  return (
    <>
      {enemy && <SummonerOverview summoner={enemy}></SummonerOverview>}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner && enemy && (
            <Matchup searchedSummoner={searchedSummoner} enemy={enemy} />
          )}
        </div>
        <div className="w-1/2 mx-0">
          {searchedSummoner && enemy && <MatchHistory summoner={enemy} />}
        </div>
      </div>
    </>
  );
};
