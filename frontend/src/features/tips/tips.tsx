import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { Summoner, Tip, TipsType } from "../../libs/league/league-types";
import {
  DislikeOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { getMatchupTips } from "../../libs/apis/league-api";

interface TipsProps {
  searchedSummoner: Summoner;
  otherSummoner: Summoner;
}

export const Tips: React.FC<TipsProps> = ({
  searchedSummoner,
  otherSummoner,
}) => {
  const [tipsInfo, setTipsInfo] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const type =
    searchedSummoner?.teamId === otherSummoner?.teamId
      ? TipsType.Synergy
      : TipsType.Matchup;

  useEffect(() => {
    let isMounted = true;
    const fetchTips = async () => {
      setIsLoading(true);
      try {
        const tips = await getMatchupTips(
          searchedSummoner.championName,
          otherSummoner.championName
        );
        if (isMounted && tips) {
          setTipsInfo(tips);
        }
      } catch (error) {
        console.error("Failed to fetch tips:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTips();

    return () => {
      isMounted = false;
    };
  }, [searchedSummoner.championName, otherSummoner.championName]);

  return (
    <div className="pt-3 pl-3 flex flex-col">
      <div className="text-lg font-bold mb-2">{`${
        searchedSummoner.championName
      } ${type === TipsType.Matchup ? "vs" : "and"} ${
        otherSummoner.championName
      } ${type === TipsType.Matchup ? "Matchup" : "Synergy"}`}</div>
      <div className="flex-1 overflow-y-auto">
        <Spin spinning={isLoading}>
          <div
            className="grid grid-cols-1 gap-2"
            style={{ height: "calc(70vh - 79px)" }}
          >
            {tipsInfo.map((tip, index) => (
              <Card
                key={index}
                // actions={[
                //   <LikeOutlined key="like" />,
                //   <DislikeOutlined key="dislike" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
                styles={{ body: { padding: 12 } }}
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
