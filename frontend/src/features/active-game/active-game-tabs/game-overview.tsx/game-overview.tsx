import React, { useEffect, useState } from "react";
import { Card, Tooltip, Typography, Skeleton, Statistic } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Game } from "../../../../libs/league/league-types";
import ChatComponent from "../../../chat/chat";
import { fetchGameOverview } from "../../../../libs/apis/game-overview-api";
import { RecommendedItems } from "./recommended-items";

const { Title, Text } = Typography;

interface ItemBuild {
  finalBuild: { itemId: string; itemName: string }[];
  buildSequence: { itemId: string; itemName: string; step: number }[];
}

export const GameOverview: React.FC<{ game: Game | null }> = ({ game }) => {
  const [estimatedWinRate, setEstimatedWinRate] = useState<number | null>(null);
  const [recommendedItems, setRecommendedItems] = useState<
    ItemBuild | { itemId: string; itemName: string }[]
  >([]);
  const [gameSummary, setGameSummary] = useState<string>(
    "No summary available."
  );
  const [loadingWinRate, setLoadingWinRate] = useState<boolean>(true);
  const [loadingItems, setLoadingItems] = useState<boolean>(true);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (game) {
        try {
          // Get language from localStorage
          const language = localStorage.getItem("language") || "en";
          const { response } = await fetchGameOverview(game, language);
          setEstimatedWinRate(response.estimated_win_rate || 0);
          setLoadingWinRate(false);
          setRecommendedItems(response.recommended_items || []);
          setLoadingItems(false);
          setGameSummary(response.game_summary || "No summary available.");
          setLoadingSummary(false);
        } catch (error) {
          console.error("Error fetching game overview:", error);
          setLoadingWinRate(false);
          setLoadingItems(false);
          setLoadingSummary(false);
        }
      }
    };
    fetchData();
  }, [game]);

  return (
    <div className="flex">
      <div className="w-4/5">
        <ChatComponent
          game={game}
          height={"75vh"}
          showAvatar={false}
          context={{ game: game as Game }}
        ></ChatComponent>
      </div>
      <div className="w-[350px] min-w-[250px] pl-4 flex flex-col space-y-4">
        {/* <Card
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
          <Title level={5} className="text-sm text-center">
            Win Chance
            <Tooltip title="This is calculated using AI based on player performance, team composition, and other factors.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          {loadingWinRate ? (
            <Skeleton.Avatar
              active
              style={{ width: 50, height: 30 }}
              shape="square"
            />
          ) : (
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
          )}
        </Card> */}
        <RecommendedItems
          loadingItems={loadingItems}
          recommendedItems={recommendedItems}
        />
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
            Game Overview
            <Tooltip title="This is a summary generated using AI based on the match events.">
              <InfoCircleOutlined className="text-primary text-sm ml-1" />
            </Tooltip>
          </Title>
          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <Text className="text-sm">{gameSummary}</Text>
          )}
        </Card>
      </div>
    </div>
  );
};
