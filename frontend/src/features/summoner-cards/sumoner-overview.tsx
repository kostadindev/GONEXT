import React, { useEffect, useState } from "react";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
  getWinRateString,
} from "../../libs/league/league-utils";
import { getSummonerStats } from "../../libs/apis/league-api";
import { Card, Avatar, Badge, Typography, theme, Spin, Tooltip } from "antd";

interface SummonerOverviewProps {
  summoner: Summoner;
}

const SummonerStatBlock = ({
  label,
  value,
}: {
  label: string;
  value: string;
  rank?: string;
}) => {
  return (
    <>
      {label && value ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <Tooltip title={label}>
            <span className="text-sm font-medium text-center">{label}</span>
          </Tooltip>
          <Tooltip title={value}>
            <span className="text-sm text-center">{value}</span>
          </Tooltip>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const SummonerOverview: React.FC<SummonerOverviewProps> = ({
  summoner,
}) => {
  const [summonerStats, setSummonerStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let isMounted = true; // Flag to track mounting status
    setIsLoading(true); // Set loading to true at the start of the effect

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const stats = await getSummonerStats("NA", summoner.puuid);
        if (isMounted) {
          setSummonerStats(stats);
          setIsLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch summoner stats:", error);
          setIsLoading(false); // Ensure loading is false on error
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false; // Set flag to false on unmount
    };
  }, [summoner]);

  return (
    <div className="flex gap-5 h-[90px]">
      <Card
        style={{
          width: "15vw",
          backgroundColor: colorBgContainer,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="flex gap-1">
          <Badge>
            <Tooltip title={summoner?.championName || "Champion"}>
              <Avatar
                src={getChampionIconSrc(summoner?.championImageId)}
                size={50}
                shape="square"
              />
            </Tooltip>
          </Badge>
          <div className="flex gap-1">
            <div className="flex flex-col justify-center gap-1">
              <Tooltip
                title={summoner?.summonerSpell1Name || "Summoner Spell 1"}
              >
                <Avatar
                  src={getSummonerSpellIconSrc(summoner?.summonerSpell1Name)}
                  alt={summoner?.summonerSpell1Name}
                  shape="square"
                  size={20}
                />
              </Tooltip>
              <Tooltip
                title={summoner?.summonerSpell2Name || "Summoner Spell 2"}
              >
                <Avatar
                  src={getSummonerSpellIconSrc(summoner?.summonerSpell2Name)}
                  alt={summoner?.summonerSpell2Name}
                  shape="square"
                  size={20}
                />
              </Tooltip>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <Tooltip title={summoner?.summonerName || "Summoner Name"}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {summoner?.summonerName}
                </Typography.Title>
              </Tooltip>
              <Tooltip title={summoner?.championName || "Champion Name"}>
                <Typography.Text>{summoner?.championName}</Typography.Text>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
      <Card
        className="flex-1"
        style={{
          backgroundColor: colorBgContainer,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin spinning={isLoading}>
          {summonerStats && (
            <div className="flex flex-row justify-center w-full">
              {summonerStats?.ranked && (
                <Tooltip title="Ranked Stats">
                  <SummonerStatBlock
                    label={"Ranked"}
                    value={`${summonerStats?.ranked?.tier} ${summonerStats?.ranked?.rank} (${summonerStats?.ranked?.leaguePoints}LP)`}
                    rank={summonerStats?.ranked?.tier}
                  ></SummonerStatBlock>
                </Tooltip>
              )}
              {summonerStats?.ranked && (
                <Tooltip title="Ranked Win Rate">
                  <SummonerStatBlock
                    label={"Ranked Win Rate"}
                    value={getWinRateString(
                      summonerStats?.ranked?.wins,
                      summonerStats?.ranked?.losses
                    )}
                  ></SummonerStatBlock>
                </Tooltip>
              )}
              {summonerStats?.flex && (
                <Tooltip title="Flex Stats">
                  <SummonerStatBlock
                    label={"Flex"}
                    value={`${summonerStats?.flex?.tier} ${summonerStats?.flex?.rank} (${summonerStats?.flex?.leaguePoints}LP)`}
                  ></SummonerStatBlock>
                </Tooltip>
              )}
              {summonerStats?.flex && (
                <Tooltip title="Flex Win Rate">
                  <SummonerStatBlock
                    label={"Flex Win Rate"}
                    value={getWinRateString(
                      summonerStats?.flex?.wins,
                      summonerStats?.flex?.losses
                    )}
                  ></SummonerStatBlock>
                </Tooltip>
              )}
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
};
