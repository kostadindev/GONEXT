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
  try {
    const response = await axios.get(`http://localhost:8000/api/summoner-stats`, { params: { region, puuid } });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the summoner stats:', error);
    return null;
  }
}


export const getMatchHistory = async (region: string, puuid: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/match-history`, { params: { region, puuid } });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the match history:', error);
    return null;
  }
}

export const getMatchupTips = async (summonerChampion: string, enemyChampion: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/matchup`, { params: { summonerChampion, enemyChampion } });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the match history:', error);
    return null;
  }
}