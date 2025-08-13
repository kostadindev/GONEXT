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
  const { token } = theme.useToken();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<"game" | "player" | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

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

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };
    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  const lightBg =
    // Whiter center with warm tint only near the edges
    "radial-gradient(ellipse at 50% 50%, rgba(255,167,38,0) 72%, rgba(255,167,38,0.035) 86%, rgba(255,167,38,0.07) 100%), linear-gradient(135deg, #ffffff 10%, #ffffff 70%, #fff7ec 100%)";
  const darkBg =
    "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 22%, rgba(0,0,0,0.35) 46%, rgba(0,0,0,0.0) 60%), linear-gradient(135deg, #0f0f0f 0%, #141414 30%, #1a1a1a 70%, #000 100%)";

  if (loading) {
    return (
      <Content
        style={{
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          background: isDarkMode ? darkBg : lightBg,
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
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          background: isDarkMode ? darkBg : lightBg,
        }}
      >
        <NotFound type={errorType} name={gameName} tag={tagLine} />
      </Content>
    );
  }

  return (
    <div
      className="relative overflow-hidden dot-grid"
      style={{
        background: isDarkMode ? darkBg : lightBg,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* Decorative gradient overlays — strong in dark, very subtle in light */}
      {isDarkMode ? (
        <>
          <div className="absolute -top-[15%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-br from-[#ffb74d]/15 via-[#ffa726]/10 to-transparent opacity-40 blur-3xl rounded-full rotate-12" />
          <div className="absolute top-[20%] -left-[5%] w-[40%] h-[60%] bg-gradient-to-tr from-[#ffa726]/20 to-transparent opacity-25 blur-3xl rounded-full -rotate-45" />
        </>
      ) : (
        <>
          <div className="absolute -top-[15%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-br from-[#ffb74d]/6 via-[#ffa726]/4 to-transparent opacity-15 blur-3xl rounded-full rotate-12" />
          <div className="absolute top-[20%] -left-[5%] w-[40%] h-[60%] bg-gradient-to-tr from-[#ffa726]/8 to-transparent opacity-10 blur-3xl rounded-full -rotate-45" />
        </>
      )}

      <Content
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div
          className="w-full px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div
            style={{
              padding: 0,
              display: "flex",
              minHeight: 0,
              background: "transparent",
              width: "100%",
            }}
          >
            <div className="pr-8 mt-[15px] flex-shrink-0">
              <Divider orientation="left">
                {game?.searchedSummoner?.teamId === 100
                  ? "Blue Team"
                  : "Red Team"}
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
                {game?.searchedSummoner?.teamId !== 100
                  ? "Blue Team"
                  : "Red Team"}
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
            <div className="flex-1 min-w-0 w-full">
              <ActiveGameTabs game={game} region={region as string} />
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};
