import React, { useEffect, useState } from "react";
import { Card, Tooltip, Typography, Skeleton, Statistic, theme } from "antd";
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

  const { token } = theme.useToken();

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

  // Responsive heights matching the page layout
  const chatHeight = "calc(100vh - 64px - 120px)"; // header + some breathing space

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0">
        <ChatComponent
          game={game}
          height={chatHeight}
          showAvatar={false}
          context={{ game: game as Game }}
        />
      </div>
      <div className="w-[350px] min-w-[280px] pl-4 flex flex-col space-y-4">
        <RecommendedItems
          loadingItems={loadingItems}
          recommendedItems={recommendedItems}
        />

        <Card
          className="rounded-xl shadow-lg border-0"
          hoverable
          styles={{
            body: {
              padding: "16px",
            },
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Title level={5} className="text-sm mb-0 font-semibold">
              Game Overview
              <Tooltip title="AI-generated summary based on teams and player tendencies">
                <InfoCircleOutlined className="ml-2 text-xs" />
              </Tooltip>
            </Title>
            {!loadingWinRate && estimatedWinRate !== null && (
              <div
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: token.colorPrimaryBg,
                  border: `1px solid ${token.colorPrimaryBorder}`,
                  color: token.colorPrimary,
                }}
              >
                {estimatedWinRate.toFixed(1)}% win chance
              </div>
            )}
          </div>

          {loadingSummary ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <Text
              className="text-sm leading-relaxed"
              style={{ color: token.colorText }}
            >
              {gameSummary}
            </Text>
          )}
        </Card>
      </div>
    </div>
  );
};
