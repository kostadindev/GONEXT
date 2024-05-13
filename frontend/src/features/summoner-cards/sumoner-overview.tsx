import React, { useEffect, useState } from "react";
import { Summoner } from "../../libs/league/league-types";
import {
  getChampionIconSrc,
  getSummonerSpellIconSrc,
  getWinRateString,
} from "../../libs/league/league-utils";
import { getSummonerStats } from "../../libs/league/league-apis";
import { Card, Avatar, Badge, Typography, theme, Spin } from "antd";

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
          <span className="text-sm font-medium text-center">{label}</span>
          <span className="text-sm text-center">{value}</span>
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
    <div className="flex gap-5 px-4 h-[90px]">
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
                <SummonerStatBlock
                  label={"Ranked"}
                  value={`${summonerStats?.ranked?.tier} ${summonerStats?.ranked?.rank} (${summonerStats?.ranked?.leaguePoints}LP)`}
                  rank={summonerStats?.ranked?.tier}
                ></SummonerStatBlock>
              )}
              {summonerStats?.ranked && (
                <SummonerStatBlock
                  label={"Ranked Win Rate"}
                  value={getWinRateString(
                    summonerStats?.ranked?.wins,
                    summonerStats?.ranked?.losses
                  )}
                ></SummonerStatBlock>
              )}
              {summonerStats?.flex && (
                <SummonerStatBlock
                  label={"Flex"}
                  value={`${summonerStats?.flex?.tier} ${summonerStats?.flex?.rank} (${summonerStats?.flex?.leaguePoints}LP)`}
                ></SummonerStatBlock>
              )}
              {summonerStats?.flex && (
                <SummonerStatBlock
                  label={"Flex Win Rate"}
                  value={getWinRateString(
                    summonerStats?.flex?.wins,
                    summonerStats?.flex?.losses
                  )}
                ></SummonerStatBlock>
              )}
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
};
