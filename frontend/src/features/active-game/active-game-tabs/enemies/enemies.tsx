import { Summoner } from "../../../../libs/league/league-types";

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
      {enemy &&
        // <Suspense fallback={<>Loading...</>}>
        //   <SummonerInfo summoner={enemy}></SummonerInfo>
        // </Suspense>
        "dsdasdadad"}
      <div className="flex w-full">
        <div className="w-1/2 mx-0">
          {searchedSummoner &&
            enemy &&
            // <MatchupInfo searchedSummoner={searchedSummoner} enemy={enemy} />
            "sdd"}
        </div>
        <div className="w-1/2 mx-0">
          {/* {searchedSummoner && enemy && <MatchHistory summoner={enemy} />} */}
        </div>
      </div>
    </>
  );
};
