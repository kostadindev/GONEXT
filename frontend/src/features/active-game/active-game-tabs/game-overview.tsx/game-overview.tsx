import React from "react";
import { Card, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Game } from "../../../../libs/league/league-types";
import ChatComponent from "../../../chat/chat";

const { Title, Text } = Typography;

export const GameOverview: React.FC<{ game: Game | null }> = ({ game }) => {
  // Using 55 as a constant value for estimated win rate.
  const estimatedWinRate = 55;

  return (
    <div className="flex">
      <div className="w-1/5 pr-4">
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={4} className="text-lg">
            Estimated Win Rate
          </Title>
          <div className="flex items-center">
            <Text strong className="text-base mr-2">
              {estimatedWinRate}%
            </Text>
            <Tooltip title="The Estimated Win Rate is calculated based on various metrics such as player performance, team composition, and other factors.">
              <InfoCircleOutlined className="text-primary text-base" />
            </Tooltip>
          </div>
        </Card>
      </div>
      <div className="w-4/5">
        <ChatComponent game={game}></ChatComponent>
      </div>
    </div>
  );
};
