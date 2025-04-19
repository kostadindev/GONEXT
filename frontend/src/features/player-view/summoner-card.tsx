import React from "react";
import { Card, Typography, Spin, Tooltip } from "antd";
import { Summoner } from "../../libs/league/league-types";

export interface SummonerCardProps {
  summoner: Summoner;
  isLoading: boolean;
  width?: number;
}

export const DEFAULT_CARD_WIDTH = 300;

export const SummonerCard: React.FC<SummonerCardProps> = ({
  summoner,
  isLoading,
  width = DEFAULT_CARD_WIDTH,
}) => (
  <Card
    style={{ width }}
    styles={{ body: { padding: 16 } }}
    hoverable
    cover={
      <Tooltip title={summoner.championImageId}>
        <div style={{ position: "relative" }}>
          <img
            alt={`${summoner.championName} Splash`}
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
  >
    <Tooltip title={summoner.riotId}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {summoner.riotId.split("#")[0]}
        <span style={{ color: "gray", fontStyle: "italic", marginLeft: 4 }}>
          #{summoner.riotId.split("#")[1]}
        </span>
      </Typography.Title>
    </Tooltip>
  </Card>
);
