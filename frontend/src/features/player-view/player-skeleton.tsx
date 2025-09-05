import React from "react";
import { Card, Skeleton } from "antd";
import { useResponsive } from "./use-responsive";
import { DEFAULT_CARD_WIDTH } from "./summoner-card";

interface PlayerSkeletonProps {
  hasGame?: boolean;
}

export const PlayerSkeleton: React.FC<PlayerSkeletonProps> = ({
  hasGame = false,
}) => {
  const { isMobile, windowWidth } = useResponsive();

  // Calculate responsive card width (matching PlayerView)
  const cardWidth = isMobile
    ? Math.min(windowWidth - 32, DEFAULT_CARD_WIDTH)
    : DEFAULT_CARD_WIDTH;

  // Calculate responsive heights (matching PlayerView)
  const matchHistoryHeight = hasGame
    ? "calc(100vh - 480px)"
    : "calc(100vh - 150px)";

  return (
    <div
      className="flex w-full gap-4"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      <div
        className="flex flex-col gap-4 pb-4"
        style={{ width: isMobile ? "100%" : cardWidth }}
      >
        {/* Summoner Card Skeleton - only show if hasGame (matching PlayerView logic) */}
        {hasGame && (
          <Card style={{ width: cardWidth }}>
            <Skeleton.Image style={{ width: "100%", height: 170 }} active />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        )}

        {/* Match History Skeleton */}
        <div style={{ height: matchHistoryHeight, width: cardWidth }}>
          <Card style={{ width: "100%", height: "100%" }}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Summoner Overview Skeleton */}
        <div className="flex gap-2" style={{ height: 110, width: "100%" }}>
          <Card
            style={{ width: 380, height: 110 }}
            bodyStyle={{ padding: "16px" }}
          >
            <Skeleton.Avatar size={80} style={{ marginRight: 16 }} active />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
          <Card
            style={{ width: 380, height: 110 }}
            bodyStyle={{ padding: "16px" }}
          >
            <Skeleton.Avatar size={80} style={{ marginRight: 16 }} active />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        </div>

        {/* Chat Skeleton - matching PlayerView styling */}
        <div className="flex-grow max-w-[770px] overflow-auto">
          <Card style={{ height: "calc(100vh - 370px)" }}>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Card>
        </div>
      </div>
    </div>
  );
};
