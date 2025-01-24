import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/apis/league-api";
import { useEffect, useState } from "react";
import { Game, Summoner } from "../../libs/league/league-types";
import { InGameSummoner } from "../summoner-cards/in-game-summoner";
import { Divider, theme } from "antd";
import { ActiveGameTabs } from "./active-game-tabs/active-game-tabs";
import { getTeams } from "../../libs/league/league-utils";
import { useParams } from "react-router-dom";

export const ActiveGame = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [game, setGame] = useState<Game | null>(null);
  const { allies, enemies } = getTeams(game);
  const { tagLine, gameName } = useParams();

  useEffect(() => {
    let ignore = false;
    getActiveGame(gameName as string, tagLine as string).then((game) => {
      !ignore && game && setGame(game);
    });
    return () => {
      ignore = true;
    };
  }, [gameName, tagLine]);

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
          <Divider orientation="left">
            {game?.searchedSummoner?.teamId === 100 ? "Blue Team" : "Red Team"}
          </Divider>
          {allies?.map((summoner: Summoner) => (
            <InGameSummoner
              key={summoner.puuid}
              summoner={summoner}
              game={game}
            ></InGameSummoner>
          ))}
          <Divider orientation="left">
            {game?.searchedSummoner?.teamId === 100 ? "Blue Team" : "Red Team"}
          </Divider>
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
