import React from "react";
import { Game, Summoner } from "../../libs/league/league-types";
import { PlayerView } from "./player-view";

interface PlayerPageProps {
  summoners?: Summoner[];
  playerPuuid?: string;
  game?: Game;
}

export const PlayerPage: React.FC<PlayerPageProps> = ({
  summoners,
  playerPuuid,
  game,
}) => {
  return (
    <div className="container mx-auto px-[10%] pt-8 h-full">
      <PlayerView summoners={summoners} playerPuuid={playerPuuid} game={game} />
    </div>
  );
};
