import axios from "axios";
import { Game } from "./league-types";


export const getActiveGame = async (): Promise<Game | null> => {
  try {
    const response = await axios.get('http://localhost:8000/api/active-game');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the active game:', error);
    return null;
  }
}

export const getSummonerStats = async (region: string, puuid: string) => {
  // const start = new Date();
  // console.log("getSUmmonerStats, ", puuid);
  // const apiUrl = BASE_URL + `/api/${region}/summoner/stats/${puuid}`;
  // const summonerStats = await fetch(apiUrl, { cache: "no-store" });
  // const end = new Date();
  // return await summonerStats.json();
  return {};
};