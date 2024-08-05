import axios, { AxiosError } from 'axios';
import dotenv from "dotenv";
dotenv.config();

class LeagueRepository {
  private headers: Record<string, any> = {
    'X-Riot-Token': process.env.LEAGUE_API_KEY,
  };

  async fetchChampionsDict(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch champions', error);
      throw new Error('Failed to fetch champions');
    }
  }

  async fetchQueueTypes(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch queues', error);
      throw new Error('Failed to fetch queues');
    }
  }

  async fetchSummonerSpellDict(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch summoner spells', error);
      throw new Error('Failed to fetch summoner spells');
    }
  }

  async getSummonerIdByPuuid(puuid: string): Promise<string | undefined> {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data.id as string;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
      return undefined;
    }
  }

  async getSummonerStats(summonerId: string): Promise<any> {
    const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
      return undefined;
    }
  }

  async getMatchesIds(puuid: string, count: number): Promise<string[] | null> {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch match IDs', error);
      return null;
    }
  }

  async getMatchById(matchId: string): Promise<any | null> {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch match by ID', error);
      return null;
    }
  }

  async getSummonerByRiotId(gameName: string, tagLine: string): Promise<any | null> {
    const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
      return null;
    }
  }

  async getActiveGameByPuuid(puuid: string): Promise<any | null> {
    const url = `https://na1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
      return null;
    }
  }

  private handleAxiosError(error: AxiosError): void {
    if (error.response) {
      console.error(`HTTP error occurred: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error('No response was received');
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}

export default new LeagueRepository();
