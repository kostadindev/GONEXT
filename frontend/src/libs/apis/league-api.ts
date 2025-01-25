import { Game, Summoner } from "../league/league-types";
import { fetchData } from "./reusable-api";

// Function to get the active game
export const getActiveGame = async (gameName: string, tagLine: string): Promise<Game | null> => {
  if (gameName === 'Doublelift') { // use mock data
    return await fetchData('matches/active');
  }
  return await fetchData(`summoners/active-game?gameName=${gameName}&tagLine=${tagLine}`);
};

export const getSummoner = async (gameName: string, tagLine: string): Promise<Summoner> => {
  return await fetchData(`summoners/by-riot-id?gameName=${gameName}&tagLine=${tagLine}`)
}

// Function to get match history
export const getMatchHistory = async (region: string, puuid: string): Promise<any> => {
  return await fetchData('matches/history', { region, puuid });
};

// Function to get summoner stats
export const getSummonerStats = async (region: string, puuid: string) => {
  return await fetchData('summoners/stats', { region, puuid });
};

// Function to get matchup tips
export const getTips = async (tipsType: string, myChampion: string, otherChampion: string) => {
  return await fetchData('tips', { myChampion, otherChampion, tipsType });
};

// Function to get a featured summoner
export const getFeaturedSummoner = async () => {
  return await fetchData('summoners/featured-summoner');
};
