import React from "react";
import { Card, Skeleton } from "antd";
import { useResponsive } from "./use-responsive";

export const PlayerSkeleton: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <div
      className="flex w-full gap-4"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      <div className="flex flex-col gap-4">
        {/* Summoner Card Skeleton */}
        <Card style={{ width: isMobile ? "100%" : 300 }}>
          <Skeleton.Image style={{ width: "100%", height: 170 }} active />
          <Skeleton active paragraph={{ rows: 1 }} />
        </Card>

        {/* Match History Skeleton */}
        <Card
          style={{
            width: isMobile ? "100%" : 300,
            height: isMobile ? 350 : 470,
          }}
        >
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Summoner Overview Skeleton */}
        <div className="flex gap-2" style={{ height: 110 }}>
          <Card style={{ width: "50%" }}>
            <Skeleton.Avatar size="large" style={{ marginRight: 16 }} active />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
          <Card style={{ width: "50%" }}>
            <Skeleton.Avatar size="large" style={{ marginRight: 16 }} active />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        </div>

        {/* Chat Skeleton */}
        <Card style={{ height: isMobile ? 400 : 450 }}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Card>
      </div>
    </div>
  );
};
