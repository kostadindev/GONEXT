import axios, { AxiosError } from 'axios';
import dotenv from "dotenv";
import { handleAxiosError } from '../../utils/axiosErrorHandler';
import prisma from '../../db/prisma';
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

  async fetchData(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw new Error('Failed to fetch data');
    }
  }

  async fetchLatestVersion(): Promise<string | undefined> {
    const url = 'https://ddragon.leagueoflegends.com/api/versions.json';
    try {
      const versions = await this.fetchData(url);
      if (Array.isArray(versions) && versions.length > 0) {
        return versions[0]; // Assuming the latest version is the first item
      } else {
        throw new Error('No versions found');
      }
    } catch (error) {
      console.error('Failed to fetch the latest version', error);
      throw new Error('Failed to fetch the latest version');
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
      handleAxiosError(error as AxiosError);
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
      handleAxiosError(error as AxiosError);
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

  async saveMatches(matches: any[]): Promise<void> {
    try {
      const matchIds = matches
        .filter(match => match !== null)
        .map(match => match.metadata.matchId);

      // Fetch existing match IDs from the database
      const existingMatches = await prisma.match.findMany({
        where: { match_id: { in: matchIds } },
        select: { match_id: true },
      });

      const existingMatchIds = new Set(existingMatches.map(m => m.match_id));

      // Filter out matches that already exist
      const newMatches = matches.filter(match => !existingMatchIds.has(match.metadata.matchId));

      // Prepare the data for new matches with nested participants
      const matchData = newMatches.map((match) => ({
        match_id: match.metadata.matchId,
        data_version: match?.metadata?.dataVersion,
        game_id: BigInt(match?.info?.gameId),
        game_mode: match.info.gameMode,
        game_type: match.info.gameType,
        game_name: match.info.gameName,
        game_version: match.info.gameVersion,
        map_id: match.info.mapId,
        end_of_game_result: match.info.endOfGameResult,
        game_creation: BigInt(match.info.gameCreation),
        game_start_time: BigInt(match.info.gameStartTimestamp),
        game_end_time: BigInt(match.info.gameEndTimestamp),
        game_duration: match.info.gameDuration,
        participants: {
          create: match.info.participants.map((p: any) => ({
            participant_id: `${match.metadata.matchId}_${p.puuid}`,
            puuid: p.puuid,
            summoner_id: p.summonerId,
            summoner_name: p.summonerName,
            team_position: p.individualPosition,
            champion_id: p.championId,
            champion_name: p.championName,
            kills: p.kills ?? 0,
            deaths: p.deaths ?? 0,
            assists: p.assists ?? 0,
            gold_earned: p.goldEarned ?? 0,
            total_damage_dealt: BigInt(p.totalDamageDealt ?? 0),
            total_damage_taken: BigInt(p.totalDamageTaken ?? 0),
            vision_score: p.visionScore ?? 0,
            win: p.win ?? false,
            team_id: p.teamId,
          })),
        },
      }));

      // Insert new matches with their participants
      for (const data of matchData) {
        await prisma.match.create({
          data,
        });
      }

      console.log('New matches with participants saved successfully.');
    } catch (error) {
      console.error('Error saving matches to the database:', error);
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
      handleAxiosError(error as AxiosError);
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
      handleAxiosError(error as AxiosError);
      return null;
    }
  }

  async getFeaturedGames(): Promise<any | null> {
    const url = 'https://na1.api.riotgames.com/lol/spectator/v5/featured-games';
    try {
      const response = await axios.get(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured games', error);
      return null;
    }
  }
}

export default new LeagueRepository();
