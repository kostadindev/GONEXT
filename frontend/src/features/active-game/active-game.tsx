import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/apis/league-api";
import { useEffect, useState } from "react";
import { Game, Summoner } from "../../libs/league/league-types";
import { InGameSummoner } from "../summoner-cards/in-game-summoner";
import { Divider, theme } from "antd";
import { ActiveGameTabs } from "./active-game-tabs/active-game-tabs";
import { getTeams } from "../../libs/league/league-utils";

export const ActiveGame = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [game, setGame] = useState<Game | null>(null);
  const { allies, enemies } = getTeams(game);

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
        margin: "0 16px",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          // background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
        }}
      >
        <div className="pr-8 mt-[15px]">
          <Divider orientation="left">Allied Team</Divider>
          {allies?.map((summoner: Summoner) => (
            <InGameSummoner
              key={summoner.puuid}
              summoner={summoner}
              game={game}
            ></InGameSummoner>
          ))}
          <Divider orientation="left">Enemy Team</Divider>
          {enemies?.map((summoner: Summoner) => (
            <InGameSummoner
              key={summoner.puuid}
              summoner={summoner}
              game={game}
            ></InGameSummoner>
          ))}
        </div>
        <ActiveGameTabs game={game} />
      </div>
    </Content>
  );
};
