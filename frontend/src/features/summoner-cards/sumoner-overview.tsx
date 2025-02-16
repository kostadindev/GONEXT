import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Tooltip, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { getSummonerStats } from "../../libs/apis/league-api";
import { Summoner } from "../../libs/league/league-types";

interface GameModeStats {
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  winRate: string;
}

interface SummonerStatsData {
  ranked?: GameModeStats;
  flex?: GameModeStats;
}

interface SummonerOverviewProps {
  summoner: Summoner;
}

const CARD_WIDTH = 380;
const CARD_HEIGHT = 110; // Set the fixed height for the cards

const SummonerStatBlock: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Tooltip title={`${label}: ${value}`}>
    <div className="flex flex-col items-center justify-center">
      <Typography.Text strong style={{ fontSize: 16 }}>
        {value}
      </Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {label}
      </Typography.Text>
    </div>
  </Tooltip>
);

const RankCard: React.FC<{ title: string; stats: GameModeStats }> = ({
  title,
  stats,
}) => {
  const tierLabel = `${stats.tier} ${stats.rank}`;
  return (
    <Card
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      hoverable
      bodyStyle={{ padding: "16px" }}
    >
      <Meta
        avatar={
          <Tooltip title={tierLabel}>
            <Avatar size={80} src={`/images/ranks/RANK=${stats.tier}.png`} />
          </Tooltip>
        }
        title={
          <Tooltip title={tierLabel}>
            <Typography.Title
              level={4}
              style={{ margin: 0, display: "flex", width: "100%" }}
              className="w-100"
            >
              <div className="flex justify-between w-full">
                {tierLabel}
                <span
                  style={{
                    color: "gray",
                    fontStyle: "italic",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {title}
                </span>
              </div>
            </Typography.Title>
          </Tooltip>
        }
        description={
          <div className="flex justify-between mt-2">
            <SummonerStatBlock label="Wins" value={stats.wins.toString()} />
            <SummonerStatBlock label="Losses" value={stats.losses.toString()} />
            <SummonerStatBlock label="Win Rate" value={stats.winRate} />
          </div>
        }
      />
    </Card>
  );
};

export const SummonerOverview: React.FC<SummonerOverviewProps> = ({
  summoner,
}) => {
  const [summonerStats, setSummonerStats] = useState<SummonerStatsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchStats = async () => {
      try {
        const stats = await getSummonerStats("NA", summoner.puuid);
        console.log("stats: ", stats, summoner);

        const processStats = (gameMode: GameModeStats | undefined) => {
          if (!gameMode) return undefined;
          const { wins = 0, losses = 0, tier, rank } = gameMode;
          const winRateCalc =
            wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
          const formattedTier = tier
            ? tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()
            : "";
          return {
            tier: formattedTier,
            rank,
            wins,
            losses,
            winRate: winRateCalc ? winRateCalc.toFixed(2) + "%" : "",
          };
        };

        if (isMounted) {
          setSummonerStats({
            ranked: processStats(stats?.ranked),
            flex: processStats(stats?.flex),
          });
        }
      } catch (error) {
        console.error("Failed to fetch summoner stats:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [summoner]);

  return (
    <div className="flex gap-2" style={{ height: CARD_HEIGHT, width: "100%" }}>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {summonerStats?.ranked && (
            <RankCard title="Ranked Solo/Duo" stats={summonerStats.ranked} />
          )}
          {summonerStats?.flex && (
            <RankCard title="Ranked Flex" stats={summonerStats.flex} />
          )}
        </>
      )}
    </div>
  );
};
