import axios from "axios";
import { Game } from "../league/league-types";
import { jwtDecode } from "jwt-decode";

// Base URL for the API
const BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API requests
const fetchData = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params, withCredentials: true });
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

// Function to fetch user data
export const fetchUser = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, { withCredentials: true });
    const { token } = response.data;
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Function to handle login success
export const handleLoginSuccess = async (token: string): Promise<any> => {
  try {
    await axios.post(`${BASE_URL}/auth/google`, { token }, { withCredentials: true });
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Function to handle logout
export const handleLogout = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Function to fetch protected data
export const fetchProtectedData = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/protected/data`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    return null;
  }
};
