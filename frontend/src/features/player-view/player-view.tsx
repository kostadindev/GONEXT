import React from "react";
import { SummonerOverview } from "../summoner-cards/sumoner-overview";
import { MatchHistory } from "../match-history/match-history";
import { Game, Summoner } from "../../libs/league/league-types";
import ChatComponent from "../chat/chat";

interface PlayerViewProps {
  summoners?: Summoner[];
  playerPuuid?: string;
  searchedSummonerPuuid?: string;
  game?: Game;
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  playerPuuid,
  searchedSummonerPuuid,
  game,
}) => {
  const player = game?.participants?.find(
    (summoner) => summoner.puuid === playerPuuid
  );

  return (
    <>
      {player && <SummonerOverview summoner={player} />}
      <div className="flex w-full space-x-[50px]">
        {" "}
        {/* Increased space here */}
        <div className="w-1/3 min-w-[300px]">
          {player && <MatchHistory summoner={player} />}
        </div>
        <div
          className="w-2/3 min-w-[300px]"
          style={{ height: `calc(70vh - 79px)` }}
        >
          {game && <ChatComponent game={game} height={"65vh"} />}
        </div>
      </div>
    </>
  );
};
