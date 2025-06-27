import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getMatchHistory } from "../../libs/apis/league-api";
import { Summoner } from "../../libs/league/league-types";
import { HistoryItem } from "./history-item";

interface GameHistory {
  win: boolean;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  matchId: string;
  queueName: string;
  participant: any;
  participants: any[];
}

interface MatchHistoryProps {
  summoner: Summoner;
  region: string;
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({
  summoner,
  region,
}) => {
  const [games, setGames] = useState<GameHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      setIsLoading(true);
      const history = await getMatchHistory(region, summoner.puuid);
      if (isMounted) {
        setGames(history || []);
        setIsLoading(false);
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, [summoner, region]);

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        {isLoading && (
          <div className="h-full flex items-center justify-center z-10">
            <Spin />
          </div>
        )}
        <div
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {games &&
            games.map((game, index) => (
              <div key={index}>
                <HistoryItem
                  key={`${summoner?.championId}-${index}`}
                  game={game}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
