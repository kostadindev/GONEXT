import { useEffect, useState } from "react";
import { Menu, type MenuProps } from "antd";
import {
  SyncOutlined,
  UserOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { Game, Summoner } from "../../../libs/league/league-types";
import { getTeams } from "../../../libs/league/league-utils";
import { useNavigate, useLocation } from "react-router-dom";
import { GameOverview } from "./game-overview.tsx/game-overview";
import { Allies } from "./allies/allies";
import { PlayerView } from "../../player-view/player-view";

interface ActiveGameTabsProps {
  game: Game | null;
  region: string;
}

export const ActiveGameTabs = ({ game, region }: ActiveGameTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allies, enemies } = getTeams(game);
  const [selectedView, setSelectedView] = useState<string>(
    game?.gameId ? "chat" : "searched-player"
  );

  // Extract searched player info from game object
  const searchedPlayerPuuid = game?.searchedSummoner?.puuid;
  const searchedPlayerName = game?.searchedSummoner?.riotId;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view");
    if (view) {
      setSelectedView(view);
    }
  }, [location.search]);

  const handleChangeView: MenuProps["onClick"] = (e) => {
    const newView = e.key;
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("view", newView);
    navigate(`${location.pathname}?${queryParams.toString()}`);
    setSelectedView(newView);
  };

  const items: MenuProps["items"] = [
    // Only show game-related tabs if there's a gameId
    ...(game?.gameId
      ? [
          {
            label: "Live Match",
            key: "chat",
            icon: <SyncOutlined spin />,
            // disabled: true,
          },
          {
            label: "Enemy Team",
            key: "enemies",
            children: enemies?.map((enemy: Summoner) => {
              return {
                label: enemy.championName,
                key: `${enemy.puuid}`, // Ensure keys are unique
              };
            }),
          },
          {
            label: "Ally Team",
            key: "allies",
            children: allies?.map((ally: Summoner) => {
              return {
                label: ally.championName,
                key: `${ally.puuid}`, // Ensure keys are unique
              };
            }),
          },
        ]
      : []),
    // Add searched player tab if we have the player info
    ...(game?.searchedSummoner
      ? [
          {
            label: searchedPlayerName || "Searched Player",
            key: "searched-player",
            icon: <UserOutlined />,
          },
        ]
      : []),
    // Add "Player not in game" tab when player is not in an active game
    ...(game?.searchedSummoner && !game?.gameId
      ? [
          {
            label: "Not in Game",
            key: "not-in-game",
            icon: <PauseCircleOutlined />,
          },
        ]
      : []),
  ];
  return (
    <div className="flex flex-col flex-1">
      <Menu
        onClick={handleChangeView}
        selectedKeys={[selectedView]}
        mode="horizontal"
        items={items}
        style={{ backgroundColor: "transparent" }}
      />
      <div className="flex flex-col pt-5">
        {selectedView === "chat" && game?.gameId && (
          <GameOverview game={game} />
        )}
        {selectedView === "searched-player" && game?.searchedSummoner && (
          <PlayerView
            game={game}
            playerPuuid={searchedPlayerPuuid || game.searchedSummoner.puuid}
            region={region}
          />
        )}
        {selectedView === "not-in-game" &&
          game?.searchedSummoner &&
          !game?.gameId && (
            <div className="flex flex-col items-center justify-center min-h-96 p-8 text-gray-500">
              <PauseCircleOutlined
                style={{ fontSize: "48px", marginBottom: "16px" }}
              />
              <h3 className="text-lg font-medium mb-2">Player not in game</h3>
              <p className="text-center">
                {searchedPlayerName || "This player"} is currently not in an
                active game.
              </p>
            </div>
          )}
        {game?.gameId &&
          game &&
          allies?.map((ally) => ally.puuid).includes(selectedView) && (
            <PlayerView
              game={game}
              playerPuuid={selectedView}
              region={region}
            />
          )}
        {game?.gameId &&
          game &&
          enemies?.map((enemy) => enemy.puuid).includes(selectedView) && (
            <PlayerView
              game={game}
              playerPuuid={selectedView}
              region={region}
            />
          )}
      </div>
    </div>
  );
};
