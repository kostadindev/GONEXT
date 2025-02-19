import { Content } from "antd/es/layout/layout";
import { getActiveGame } from "../../libs/apis/league-api";
import { useEffect, useState } from "react";
import { Game, Summoner } from "../../libs/league/league-types";
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
  const [error, setError] = useState(false); // Track if the game is not found

  const { tagLine, gameName } = useParams();
  const { allies = [], enemies = [] } = getTeams(game);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(false);

    getActiveGame(gameName as string, tagLine as string)
      .then((game) => {
        if (!ignore) {
          if (game) {
            setGame(game);
          } else {
            setError(true); // Handle 404 error case
          }
        }
      })
      .catch((err) => {
        if (!ignore && err.response?.status === 404) {
          setError(true);
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
  }, [gameName, tagLine]);

  if (loading) {
    return (
      <Content
        style={{
          margin: "0 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1, // Allow it to take up remaining space
          minHeight: 0, // Prevent overflow issues
        }}
      >
        <Spin size="large" />
      </Content>
    );
  }

  if (error) {
    return (
      <Content
        style={{
          margin: "0 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1, // Allow it to take up remaining space
          minHeight: 0, // Prevent overflow issues
        }}
      >
        <NotFound type="game" />
      </Content>
    );
  }

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
