import React, { useEffect, useState } from "react";
import { Card, Tooltip, Typography, Avatar, Spin, Statistic } from "antd";
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
  const [gameSummary, setGameSummary] = useState<string>(
    "No summary available."
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (game) {
        try {
          const { response } = await fetchGameOverview(game);
          setEstimatedWinRate(response.estimated_win_rate || 0);
          setRecommendedItems(response.recommended_items || []);
          setGameSummary(response.game_summary || "No summary available.");
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
        <ChatComponent game={game} height={"75vh"}></ChatComponent>
      </div>
      <div className="w-1/5 min-w-[250px] pl-4 flex flex-col space-y-4">
        <Card
          className="rounded-lg shadow-md"
          hoverable
          styles={{
            body: {
              padding: "12px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {" "}
          <Title level={5} className="text-sm text-center">
            Win Chance{" "}
            <Tooltip title="This is calculated using AI based on player performance, team composition, and other factors.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <Statistic
            value={estimatedWinRate as number}
            precision={2}
            valueStyle={{
              color:
                estimatedWinRate && estimatedWinRate > 50
                  ? "#3f8600"
                  : "#cf1322",
            }}
            suffix="%"
          />
        </Card>
        <Card
          className="rounded-lg shadow-md"
          hoverable
          styles={{
            body: {
              padding: "12px",
            },
          }}
        >
          <Title level={5} className="text-sm text-center">
            Recommended Items
            <Tooltip title="AI-recommended items for this match.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <div className="flex justify-between">
            {recommendedItems.map(({ itemId, itemName }, index) => (
              <Tooltip key={index} title={itemName}>
                <Avatar
                  src={getItemIconSrcById(itemId)}
                  alt={`Item ${itemName}`}
                  size={35}
                  shape="square"
                />
              </Tooltip>
            ))}
          </div>
        </Card>
        <Card
          className="rounded-lg shadow-md"
          hoverable
          styles={{
            body: {
              padding: "12px",
            },
          }}
        >
          <Title level={5} className="text-sm text-center">
            Game Overview{" "}
            <Tooltip title="This is a summary generated using AI based on the match events.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          <Text className="text-sm">{gameSummary}</Text>
        </Card>
      </div>
    </div>
  );
};
