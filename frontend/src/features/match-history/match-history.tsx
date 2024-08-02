import { useState, useEffect } from "react";
import { Spin } from "antd";
import { GameHistory, Summoner } from "../../libs/league/league-types";
import { getMatchHistory } from "../../libs/league/league-apis";
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
    <div className="pt-3 pr-3 rounded-lg flex flex-col">
      <div className="text-lg font-bold mb-2">
        {`${summoner.championName}'s Match History`}
      </div>
      <Spin spinning={isLoading}>
        <div
          className="flex-1 overflow-y-auto grid grid-cols-1 gap-2"
          style={{ height: "calc(70vh - 79px)" }}
        >
          {games?.map((game, index) => (
            <HistoryItem key={`${summoner?.championId}-${index}`} game={game} />
          ))}
        </div>
      </Spin>
    </div>
  );
};
