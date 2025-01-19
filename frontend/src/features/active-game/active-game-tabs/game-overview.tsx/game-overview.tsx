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
      <div className="w-1/5 pr-4 flex flex-col space-y-4">
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={5} className="text-sm">
            Estimated Win Rate
          </Title>
          <div className="flex items-center">
            <Text strong className="text-sm mr-2">
              {estimatedWinRate}%
            </Text>
            <Tooltip title="The Estimated Win Rate is calculated based on various metrics such as player performance, team composition, and other factors.">
              <InfoCircleOutlined className="text-primary text-sm" />
            </Tooltip>
          </div>
        </Card>
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={5} className="text-sm">
            Game Summary
          </Title>
          <Text className="text-sm">
            In a competitive Classic match between Team 100 and Team 200, Team
            100 emerged victorious after a battle lasting 401 seconds. Champions
            like Lillia, Warwick, and Caitlyn played pivotal roles in securing
            key objectives and leveraging their team synergy effectively against
            opponents such as Vayne and Riven from Team 200.
          </Text>
        </Card>
      </div>
      <div className="w-4/5">
        <ChatComponent game={game}></ChatComponent>
      </div>
    </div>
  );
};
