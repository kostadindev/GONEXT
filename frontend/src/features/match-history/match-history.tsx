import { useState, useEffect } from "react";
import { Spin } from "antd";
import { GameHistory, Summoner } from "../../libs/league/league-types";
import { getMatchHistory } from "../../libs/apis/league-api";
import { HistoryItem } from "./history-item";

interface MatchHistoryProps {
  summoner: Summoner;
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ summoner }) => {
  const [games, setGames] = useState<GameHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      setIsLoading(true);
      const history = await getMatchHistory("na1", summoner.puuid);
      if (isMounted) {
        setGames(history || []);
        setIsLoading(false);
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, [summoner]);

  return (
    <div className="flex flex-col h-full pt-4">
      <div className="relative flex-1 overflow-hidden">
        {/* Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Spin />
          </div>
        )}
        {/* Content */}
        <div
          className={`flex flex-col h-full overflow-y-auto transition-opacity duration-300 ${
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
