import React, { useEffect, useState } from "react";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
} from "../../libs/league/league-utils";
import { getSummonerStats } from "../../libs/league/league-apis";

interface SummonerOverviewProps {
  summoner: Summoner;
}

export const SummonerOverview: React.FC<SummonerOverviewProps> = ({
  summoner,
}) => {
  const [summonerStats, setSummonerStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getSummonerStats("NA", summoner.puuid);
      setSummonerStats(stats);
    };

    fetchStats();
  }, [summoner]);

  return (
    <div className="flex gap-5 px-5">
      <div className="flex items-center gap-2 justify-center w-1/8 border-solid border-2 border-black-600 p-4">
        <img
          src={getChampionIconSrc(summoner?.championName)}
          width={40}
          height={40}
          alt="Champion Icon"
          className="rounded-full"
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
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium text-center">
            {summoner?.summonerName}
          </span>
          <span className="text-sm text-gray-500 text-center">
            {summoner?.championName}
          </span>
        </div>
      </div>
      <div
        style={{ height: "10vh" }}
        className="flex items-center p-4 gap-4 rounded-md border-solid border-2 border-black-600 flex-1 min-h-[10vh]"
      >
        {summonerStats && (
          <>
            {summonerStats.ranked && (
              <div className="flex flex-col items-center justify-center flex-1">
                <span className="text-sm font-medium text-center">Ranked</span>
                <span className="text-sm text-center">{`${summonerStats.ranked.tier} ${summonerStats.ranked.rank}`}</span>
              </div>
            )}
            {summonerStats.flex && (
              <div className="flex flex-col items-center justify-center flex-1">
                <span className="text-sm font-medium text-center">Flex</span>
                <span className="text-sm text-center">{`${summonerStats.flex.tier} ${summonerStats.flex.rank}`}</span>
              </div>
            )}
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-sm font-medium text-center">
                Summoner Level
              </span>
              <span className="text-sm text-center">Level 304</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-sm font-medium text-center">
                Champion Win Rate
              </span>
              <span className="text-sm text-center">65% (20 Played)</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-sm font-medium text-center">
                Overall Win Rate
              </span>
              <span className="text-sm text-center">61% (661 Played)</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-sm font-medium text-center">KDA</span>
              <span className="text-sm text-center"> 5.1 / 3.8 / 5.8</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
