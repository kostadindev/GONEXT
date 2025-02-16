import React, { useEffect, useState } from "react";
import { SummonerOverview } from "../summoner-cards/sumoner-overview";
import { MatchHistory } from "../match-history/match-history";
import { Game, Summoner } from "../../libs/league/league-types";
import ChatComponent from "../chat/chat";
import { useParams } from "react-router-dom";
import { getSummoner } from "../../libs/apis/league-api";

import { Card, Typography, Spin, Tooltip } from "antd";

interface PlayerViewProps {
  summoners?: Summoner[];
  playerPuuid?: string;
  game?: Game;
}

interface SummonerCardProps {
  summoner: Summoner;
  isLoading: boolean;
}

const CARD_WIDTH = 300;

const SummonerCard: React.FC<SummonerCardProps> = ({ summoner, isLoading }) => (
  <Card
    style={{ width: CARD_WIDTH }}
    hoverable
    cover={
      <Tooltip title={summoner.championImageId}>
        <div style={{ position: "relative" }}>
          <img
            alt="Champion Splash"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summoner.championImageId}_0.jpg`}
            style={{ width: "100%", display: "block" }}
          />
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Spin />
            </div>
          )}
        </div>
      </Tooltip>
    }
  >
    <Tooltip title={summoner.riotId}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {summoner.riotId.split("#")[0]}
        <span style={{ color: "gray", fontStyle: "italic", marginLeft: 4 }}>
          #{summoner.riotId.split("#")[1]}
        </span>
      </Typography.Title>
    </Tooltip>
  </Card>
);

export const PlayerView: React.FC<PlayerViewProps> = ({
  playerPuuid,
  game,
}) => {
  const { tagLine, gameName } = useParams();
  const [player, setPlayer] = useState<Summoner | undefined>(undefined);
  const height = game ? "65vh" : "calc(100vh - 250px)";

  useEffect(() => {
    let isMounted = true;

    if (game && playerPuuid) {
      const foundPlayer = game.participants?.find(
        (summoner) => summoner.puuid === playerPuuid
      );
      if (isMounted) setPlayer(foundPlayer);
    } else if (gameName && tagLine) {
      getSummoner(gameName as string, tagLine as string).then((summoner) => {
        if (isMounted) setPlayer(summoner);
      });
    }

    return () => {
      isMounted = false; // Clean up to prevent setting state after unmount.
    };
  }, [game, playerPuuid, gameName, tagLine]);

  return (
    <div className="flex w-full space-x-4">
      <div className="flex-col">
        {player && (
          <SummonerCard summoner={player} isLoading={false}></SummonerCard>
        )}
        <div className="h-[470px]">
          {player && <MatchHistory summoner={player} />}
        </div>
      </div>
      <div>
        {player && <SummonerOverview summoner={player} />}
        <div className="flex-grow h-[450px] max-w-[770px]">
          <ChatComponent
            game={game || null}
            height={"600px"}
            showAvatar={false}
          />
        </div>
      </div>
    </div>
  );
};
