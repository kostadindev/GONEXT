import axios from "axios";
import { Game } from "../league/league-types";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, fetchData } from "./reusable-api";

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

// Function to fetch user data
export const fetchUser = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, { withCredentials: true });
    return response?.data?.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};