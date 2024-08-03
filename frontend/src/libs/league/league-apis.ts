import axios from "axios";
import { Game } from "./league-types";

// Base URL for the API
const BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API requests
const fetchData = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching data from ${endpoint}:`, error);
    return null;
  }
};

// Function to get the active game
export const getActiveGame = async (): Promise<Game | null> => {
  return await fetchData('matches/active');
};

// Function to get match history
export const getMatchHistory = async (region: string, puuid: string): Promise<any> => {
  return await fetchData('matches/history', { region, puuid });
};

// Function to get summoner stats
export const getSummonerStats = async (region: string, puuid: string) => {
  return await fetchData('summoners/stats', { region, puuid });
};

// Function to get matchup tips
export const getMatchupTips = async (summonerChampion: string, enemyChampion: string) => {
  return await fetchData('champions/matchup', { summonerChampion, enemyChampion });
};
