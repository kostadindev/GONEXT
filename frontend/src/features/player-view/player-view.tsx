import React, { useEffect, useState } from "react";
import { SummonerOverview } from "../summoner-cards/sumoner-overview";
import { MatchHistory } from "../match-history/match-history";
import { Game, Summoner } from "../../libs/league/league-types";
import ChatComponent from "../chat/chat";
import { useParams } from "react-router-dom";
import { getSummoner } from "../../libs/apis/league-api";
import { useResponsive } from "./use-responsive";
import { PlayerSkeleton } from "./player-skeleton";
import { SummonerCard, DEFAULT_CARD_WIDTH } from "./summoner-card";
import { ErrorBoundary } from "./error-boundary";

import { Typography } from "antd";

interface PlayerViewProps {
  summoners?: Summoner[];
  playerPuuid?: string;
  game?: Game;
  region: string;
}

const PlayerContent: React.FC<PlayerViewProps> = ({
  playerPuuid,
  game,
  region,
}) => {
  const { tagLine, gameName } = useParams<{
    tagLine?: string;
    gameName?: string;
  }>();
  const [player, setPlayer] = useState<Summoner | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobile, windowWidth } = useResponsive();

  // Calculate responsive card width
  const cardWidth = isMobile
    ? Math.min(windowWidth - 32, DEFAULT_CARD_WIDTH)
    : DEFAULT_CARD_WIDTH;

  // Calculate responsive heights
  const matchHistoryHeight = isMobile ? 350 : "calc(100vh - 480px)";
  const chatMaxHeight = isMobile
    ? "calc(100vh - 400px)"
    : "calc(100vh - 350px)";

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchPlayerData = async () => {
      try {
        if (game?.gameId && playerPuuid) {
          const foundPlayer = game.participants?.find(
            (summoner) => summoner.puuid === playerPuuid
          );
          if (isMounted) {
            setPlayer(foundPlayer);
            setIsLoading(false);
          }
        } else if (gameName && tagLine) {
          const summoner = await getSummoner(gameName, tagLine, region);
          if (isMounted) {
            setPlayer(summoner);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPlayerData();

    return () => {
      isMounted = false;
    };
  }, [game, playerPuuid, gameName, tagLine, region]);

  if (isLoading) {
    return <PlayerSkeleton />;
  }

  return (
    <div
      className="flex w-full gap-4"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      {player ? (
        <>
          <div className="flex flex-col gap-4">
            <SummonerCard
              summoner={player}
              isLoading={false}
              width={cardWidth}
            />
            <div style={{ height: matchHistoryHeight, width: "100%" }}>
              <MatchHistory summoner={player} region={region} />
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <SummonerOverview summoner={player} region={region} />
            <div className="flex-grow max-w-[770px] overflow-auto">
              <ChatComponent
                game={game || null}
                height="calc(100vh - 370px)"
                showAvatar={false}
                context={{ game }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full p-8 text-center">
          <Typography.Title level={3}>No player data found</Typography.Title>
          <Typography.Paragraph>
            Please check the player name and tag or try another search.
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
};

export const PlayerView: React.FC<PlayerViewProps> = (props) => {
  return (
    <ErrorBoundary>
      <PlayerContent {...props} />
    </ErrorBoundary>
  );
};
