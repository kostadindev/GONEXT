import React, { useEffect, useState } from "react";
import { Card, Tooltip, Typography, Avatar, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Game } from "../../../../libs/league/league-types";
import ChatComponent from "../../../chat/chat";
import { getItemIconSrcById } from "../../../../libs/league/league-utils";
import { fetchGameOverview } from "../../../../libs/apis/game-overview-api";

const { Title, Text } = Typography;

export const GameOverview: React.FC<{ game: Game | null }> = ({ game }) => {
  const [estimatedWinRate, setEstimatedWinRate] = useState<number | null>(null);
  const [recommendedItems, setRecommendedItems] = useState<
    { itemId: string; itemName: string }[]
  >([]);
  const [gameSummary, setGameSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (game) {
        try {
          // Replace "gemini-1.5-flash" and "en" with your desired model and language if needed
          const { response } = await fetchGameOverview(game);
          setEstimatedWinRate(response.estimated_win_rate || 0); // Assume API returns `estimatedWinRate`
          setRecommendedItems(response.recommended_items || []); // Assume API returns `recommendedItems`
          setGameSummary(response.game_summary || "No summary available."); // Assume API returns `gameSummary`
        } catch (error) {
          console.error("Error fetching game overview:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [game]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

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
            {recommendedItems.map(({ itemId }, index) => (
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
            Game Overview{" "}
            <Tooltip title="This summary is generated using AI analysis based on the events and outcomes of the game.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <Text className="text-sm">{gameSummary}</Text>
        </Card>
      </div>
    </div>
  );
};
