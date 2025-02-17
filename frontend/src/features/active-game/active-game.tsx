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
  const { allies = [], enemies = [] } = getTeams(game);
  const { tagLine, gameName } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getActiveGame(gameName as string, tagLine as string).then((game) => {
      if (!ignore) {
        game && setGame(game);
        setLoading(false);
      }
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
      className="w-[80%]" // turn on when adding ads
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          borderRadius: borderRadiusLG,
          display: "flex",
        }}
      >
        <div className="pr-8 mt-[15px]">
          <Divider orientation="left">
            {game?.searchedSummoner?.teamId === 100 ? "Blue Team" : "Red Team"}
          </Divider>
          {(loading ? Array.from({ length: 5 }) : allies)?.map(
            (summoner, index) => (
              <InGameSummoner
                key={`ally-${index}`}
                summoner={summoner || {}}
                game={game}
                loading={loading}
              />
            )
          )}
          <Divider orientation="left">
            {game?.searchedSummoner?.teamId !== 100 ? "Blue Team" : "Red Team"}
          </Divider>
          {(loading ? Array.from({ length: 5 }) : enemies)?.map(
            (summoner, index) => (
              <InGameSummoner
                key={`enemy-${index}`}
                summoner={summoner || {}}
                game={game}
                loading={loading}
              />
            )
          )}
        </div>
        <ActiveGameTabs game={game} />
      </div>
    </Content>
  );
};
