import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/league/league-apis";
import { useEffect, useState } from "react";
import { Game, Summoner } from "../../libs/league/league-types";
import { InGameSummoner } from "../summoner-cards/in-game-summoner";
import { theme } from "antd";

export const ActiveGame = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {game?.participants?.map((summoner: Summoner) => (
          <InGameSummoner
            key={summoner.puuid}
            summoner={summoner}
          ></InGameSummoner>
        ))}
      </div>
    </Content>
  );
};
