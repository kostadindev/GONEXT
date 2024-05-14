import { Avatar, Card, Spin } from "antd";
import { Summoner, Tip } from "../../libs/league/league-types";
import {
  DislikeOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { getMatchupTips } from "../../libs/league/league-apis";

export const Matchup = ({
  searchedSummoner,
  enemy,
}: {
  searchedSummoner: Summoner;
  enemy: Summoner;
}) => {
  const [matchupInfo, setMatchupInfo] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading status

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true); // Set loading to true when the fetch starts

    const fetchMatchupTips = async () => {
      try {
        const tips = await getMatchupTips(
          searchedSummoner.championName,
          enemy.championName
        );
        if (isMounted && tips) {
          setMatchupInfo(tips);
        }
      } catch (error) {
        console.error("Failed to fetch matchup tips:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false); // Set loading to false when the fetch completes or fails
        }
      }
    };

    fetchMatchupTips();

    return () => {
      isMounted = false;
    };
  }, [searchedSummoner.championName, enemy.championName]);

  return (
    <div className="p-4 flex flex-col">
      <div className="text-lg font-bold mb-2">{`${searchedSummoner.championName} vs ${enemy.championName} Matchup`}</div>
      <div className="flex-1 overflow-y-auto">
        <Spin spinning={isLoading}>
          <div
            className="grid grid-cols-1 gap-2"
            style={{ height: "calc(72vh - 79px)" }}
          >
            {matchupInfo?.map((tip, index) => (
              <Card
                key={index}
                actions={[
                  <LikeOutlined key="like" />,
                  <DislikeOutlined key="dislike" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta title={tip.label} description={tip.text} />
              </Card>
            ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};
