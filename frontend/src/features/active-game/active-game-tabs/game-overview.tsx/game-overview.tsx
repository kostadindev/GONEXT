import React from "react";
import { Card, Tooltip, Typography, Avatar } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Game } from "../../../../libs/league/league-types";
import ChatComponent from "../../../chat/chat";
import { getItemIconSrcById } from "../../../../libs/league/league-utils";

const { Title, Text } = Typography;

export const GameOverview: React.FC<{ game: Game | null }> = ({ game }) => {
  // Using 55 as a constant value for estimated win rate.
  const estimatedWinRate = 55;
  const recommendedItems = [3179, 6691, 3814, 3179, 6691, 3814].map((itemId) =>
    itemId.toString()
  );

  return (
    <div className="flex">
      <div className="w-4/5">
        <ChatComponent game={game}></ChatComponent>
      </div>
      <div className="w-1/5 pl-4 flex flex-col space-y-4">
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={5} className="text-sm text-center">
            Estimated Win Probability{" "}
            <Tooltip title="The Estimated Win Probability is calculated using AI models based on various metrics such as player performance, team composition, and other factors.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <div className="flex items-center justify-center">
            <Text strong className="text-sm mr-2">
              {estimatedWinRate}%
            </Text>
          </div>
        </Card>
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={5} className="text-sm text-center">
            Recommended Items{" "}
            <Tooltip title="These items are recommended for the game based on AI analysis of the match context.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <div className="flex justify-between">
            {recommendedItems.map((itemId, index) => (
              <Avatar
                key={index}
                src={getItemIconSrcById(itemId)}
                alt={`Item ${itemId}`}
                size={40}
                shape="square"
              />
            ))}
          </div>
        </Card>
        <Card className="rounded-lg shadow-md" bodyStyle={{ padding: "16px" }}>
          <Title level={5} className="text-sm text-center">
            Game Summary{" "}
            <Tooltip title="This summary is generated using AI analysis based on the events and outcomes of the game.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
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
    </div>
  );
};
