import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/apis/league-api";
import { useEffect, useState } from "react";
import { Game } from "../../libs/league/league-types";
import { InGameSummoner } from "../summoner-cards/in-game-summoner";
import { Divider, theme, Spin } from "antd";
import { ActiveGameTabs } from "./active-game-tabs/active-game-tabs";
import { getTeams } from "../../libs/league/league-utils";
import { useParams } from "react-router-dom";
import NotFound from "../not-found/not-found";

export const ActiveGame = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<"game" | "player" | null>(null);

  const { tagLine, gameName, region } = useParams();
  const { allies = [], enemies = [] } = getTeams(game);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErrorType(null);

    getActiveGame(gameName as string, tagLine as string, region as string)
      .then((game) => {
        if (!ignore) {
          if (!game) {
            setErrorType("game");
          } else {
            setGame(game);
          }
        }
      })
      .catch((err) => {
        if (!ignore) {
          if (err.response?.status === 404) {
            setErrorType("player");
          } else {
            console.log("HellO", err);
            setErrorType("game");
          }
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [gameName, tagLine, region]);

  if (loading) {
    return (
      <Content
        style={{
          margin: "0 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" />
      </Content>
    );
  }

  if (errorType) {
    return (
      <Content
        style={{
          margin: "0 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <NotFound type={errorType} name={gameName} tag={tagLine} />
      </Content>
    );
  }

  return (
    <Content
      style={{
        margin: "0 16px",
        display: "flex",
        flexDirection: "column",
      }}
      className="w-[80%]" // turn on when adding ads
    >
      <div
        style={{
          padding: 24,
          borderRadius: borderRadiusLG,
          display: "flex",
          minHeight: 0, // Allow flex children to shrink
        }}
      >
        <div className="pr-8 mt-[15px] flex-shrink-0">
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
        <div className="flex-1 min-w-0">
          <ActiveGameTabs game={game} region={region as string} />
        </div>
      </div>
    </Content>
  );
};
