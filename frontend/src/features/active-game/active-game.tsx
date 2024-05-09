import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/league/league-apis";
import { useEffect, useState } from "react";
import { Game, Summoner } from "../../libs/league/league-types";
import { InGameSummoner } from "../summoner-cards/in-game-summoner";

export const ActiveGame = () => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    let ignore = false;
    getActiveGame().then((game) => {
      !ignore && setGame(game);
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Content
      style={{
        margin: "16px",
      }}
    >
      {game?.participants?.map((summoner: Summoner) => (
        <InGameSummoner
          key={summoner.puuid}
          summoner={summoner}
        ></InGameSummoner>
      ))}
    </Content>
  );
};
