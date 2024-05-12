import React, { useEffect, useState } from "react";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
} from "../../libs/league/league-utils";
import { getSummonerStats } from "../../libs/league/league-apis";
import { Card, Avatar, Badge, Typography } from "antd";

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
    <div className="flex gap-5 px-4">
      <Card style={{ width: "15vw" }}>
        <div className="flex gap-1">
          <Badge>
            <Avatar
              src={getChampionIconSrc(summoner?.championName)}
              size="large"
            />
          </Badge>
          <div className="flex gap-1">
            <div className="flex flex-col">
              <Avatar
                src={getSummonerSpellIconSrc(summoner?.summonerSpell1Name)}
                alt={summoner?.summonerSpell1Name}
                size={20}
              />
              <Avatar
                src={getSummonerSpellIconSrc(summoner?.summonerSpell2Name)}
                alt={summoner?.summonerSpell1Name}
                size={20}
              />
            </div>
            <div>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {summoner?.summonerName}
              </Typography.Title>
              <Typography.Text>{summoner?.championName}</Typography.Text>
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        {summonerStats && (
          <div className="flex flex-row">
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
          </div>
        )}
      </Card>
    </div>
  );
};
