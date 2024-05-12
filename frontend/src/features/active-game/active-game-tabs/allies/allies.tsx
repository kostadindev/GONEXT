import React from "react";
import { Summoner } from "../../../../libs/league/league-types";
// import { SummonerInfo } from "../summoner-info/summoner-info";

export const Allies = ({
  summoners,
  summonerPuuid,
}: {
  summoners: Summoner[] | undefined;
  summonerPuuid: string;
}) => {
  // Access the selected player using the selectedIndex
  const summoner = summoners?.find(
    (summoner) => summoner.puuid === summonerPuuid
  );

  return <div>{"dsad"}</div>;
};
