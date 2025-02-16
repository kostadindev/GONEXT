import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Spin, Tooltip } from "antd";
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

        // Process Ranked Solo/Duo stats
        const rankedWins = stats?.ranked?.wins || 0;
        const rankedLosses = stats?.ranked?.losses || 0;
        const rankedWinRateCalc =
          rankedWins + rankedLosses > 0
            ? rankedWins / (rankedWins + rankedLosses)
            : 0;
        const rankedWinRate = rankedWinRateCalc
          ? (rankedWinRateCalc * 100).toFixed(2) + "%"
          : "";
        const rankedTierRaw = stats?.ranked?.tier;
        const rankedFormattedTier = rankedTierRaw
          ? rankedTierRaw.charAt(0).toUpperCase() +
            rankedTierRaw.slice(1).toLowerCase()
          : "";
        const rankedStats: GameModeStats | undefined = stats?.ranked
          ? {
              tier: rankedFormattedTier,
              rank: stats.ranked.rank,
              wins: rankedWins,
              losses: rankedLosses,
              winRate: rankedWinRate,
            }
          : undefined;

        // Process Flex stats if present
        let flexStats: GameModeStats | undefined;
        if (stats?.flex) {
          const flexWins = stats.flex.wins || 0;
          const flexLosses = stats.flex.losses || 0;
          const flexWinRateCalc =
            flexWins + flexLosses > 0 ? flexWins / (flexWins + flexLosses) : 0;
          const flexWinRate = flexWinRateCalc
            ? (flexWinRateCalc * 100).toFixed(2) + "%"
            : "";
          const flexTierRaw = stats.flex.tier;
          const flexFormattedTier = flexTierRaw
            ? flexTierRaw.charAt(0).toUpperCase() +
              flexTierRaw.slice(1).toLowerCase()
            : "";
          flexStats = {
            tier: flexFormattedTier,
            rank: stats.flex.rank,
            wins: flexWins,
            losses: flexLosses,
            winRate: flexWinRate,
          };
        }

        if (isMounted) {
          setSummonerStats({
            ranked: rankedStats,
            flex: flexStats,
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

  const rankedTierLabel = summonerStats?.ranked
    ? `${summonerStats.ranked.tier} ${summonerStats.ranked.rank}`
    : "";
  const flexTierLabel = summonerStats?.flex
    ? `${summonerStats.flex.tier} ${summonerStats.flex.rank}`
    : "";

  return (
    <div className="flex gap-5">
      <Card
        style={{ width: 300, height: "100%" }}
        cover={
          <Tooltip title={summoner.championImageId}>
            <div style={{ position: "relative" }}>
              <img
                alt="Champion Splash"
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summoner.championImageId}_0.jpg`}
                style={{ width: "100%", display: "block" }}
              />
              {isLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <Spin />
                </div>
              )}
            </div>
          </Tooltip>
        }
        title={
          <Tooltip title={summoner.riotId}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {summoner.riotId.split("#")[0]}
              <span
                style={{ color: "gray", fontStyle: "italic", marginLeft: 4 }}
              >
                #{summoner.riotId.split("#")[1]}
              </span>
            </Typography.Title>
          </Tooltip>
        }
      >
        <Spin spinning={isLoading}>
          {/* Ranked Solo/Duo Meta */}
          {summonerStats?.ranked && (
            <Meta
              avatar={
                <Tooltip title={rankedTierLabel}>
                  <Avatar
                    size={80}
                    src={`/images/ranks/RANK=${summonerStats.ranked.tier}.png`}
                  />
                </Tooltip>
              }
              title={
                <Tooltip title={rankedTierLabel}>
                  <>
                    <span
                      style={{
                        color: "gray",
                        fontStyle: "italic",
                        fontSize: 14,
                      }}
                    >
                      Ranked Solo/Duo
                    </span>
                    <Typography.Title
                      level={4}
                      style={{ margin: 0, display: "flex" }}
                    >
                      {rankedTierLabel}
                    </Typography.Title>
                  </>
                </Tooltip>
              }
              description={
                <div className="flex justify-between mt-2">
                  <SummonerStatBlock
                    label="Wins"
                    value={summonerStats.ranked.wins.toString()}
                  />
                  <SummonerStatBlock
                    label="Losses"
                    value={summonerStats.ranked.losses.toString()}
                  />
                  <SummonerStatBlock
                    label="Win Rate"
                    value={summonerStats.ranked.winRate}
                  />
                </div>
              }
            />
          )}

          {/* Flex Meta (render only if data is present) */}
          {summonerStats?.flex && (
            <div className="mt-4">
              <Meta
                avatar={
                  <Tooltip title={flexTierLabel}>
                    <Avatar
                      size={80}
                      src={`/images/ranks/RANK=${summonerStats.flex.tier}.png`}
                    />
                  </Tooltip>
                }
                title={
                  <Tooltip title={flexTierLabel}>
                    <>
                      <span
                        style={{
                          color: "gray",
                          fontStyle: "italic",
                          fontSize: 14,
                        }}
                      >
                        Ranked Flex
                      </span>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, display: "flex" }}
                      >
                        {flexTierLabel}
                      </Typography.Title>
                    </>
                  </Tooltip>
                }
                description={
                  <div className="flex justify-between mt-2">
                    <SummonerStatBlock
                      label="Wins"
                      value={summonerStats.flex.wins.toString()}
                    />
                    <SummonerStatBlock
                      label="Losses"
                      value={summonerStats.flex.losses.toString()}
                    />
                    <SummonerStatBlock
                      label="Win Rate"
                      value={summonerStats.flex.winRate}
                    />
                  </div>
                }
              />
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
};
