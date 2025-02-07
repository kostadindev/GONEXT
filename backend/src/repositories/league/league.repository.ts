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

  async saveMatch(matchId: string, match: any): Promise<void> {
    try {
      await prisma.match.upsert({
        where: { match_id: matchId },
        update: {
          game_mode: match?.info?.gameMode,
          game_version: match?.info?.gameVersion,
          game_duration: match?.info?.gameDuration,
        },
        create: {
          match_id: matchId,
          data_version: match?.metadata?.dataVersion,
          game_id: BigInt(match?.info?.gameId),
          game_mode: match.info.gameMode,
          game_type: match.info.gameType,
          game_name: match.info.gameName,
          game_version: match.info.gameVersion,
          map_id: match.info.mapId,
          end_of_game_result: match.info.endOfGameResult, // e.g. "GameComplete"
          game_creation: BigInt(match.info.gameCreation),
          game_start_time: BigInt(match.info.gameStartTimestamp),
          game_end_time: BigInt(match.info.gameEndTimestamp),
          game_duration: match.info.gameDuration,
          participants: {
            create: match.info.participants.map((p: any, index: number) => ({
              // You can choose how to create a unique participant_id.
              // Using the index is just an example; some people use p.puuid or p.summonerId.
              puuid: p.puuid,
              summoner_id: p.summonerId,       // from match.info.participants[i].summonerId
              summoner_name: p.summonerName,   // from match.info.participants[i].summonerName
              team_position: p.individualPosition, // sometimes "TOP", "JUNGLE", etc.
              champion_id: p.championId,
              champion_name: p.championName,

              // Riot’s match v5 data may *not* always have "kills" on the top level.
              // If you see them in your raw data, map them here.
              // If not, you can safely default to 0 or compute from "challenges".
              kills: p.kills ?? 0,
              deaths: p.deaths ?? 0,
              assists: p.assists ?? 0,

              gold_earned: p.goldEarned ?? 0,

              // BigInt fields in Prisma:
              total_damage_dealt: BigInt(p.totalDamageDealt ?? 0),
              total_damage_taken: BigInt(p.totalDamageTaken ?? 0),

              vision_score: p.visionScore ?? 0,

              // In Riot’s v5 data, "win" often appears in the "teams" array.
              // Some 3rd-party APIs merge it into participants. If not present, default it:
              win: p.win ?? false,

              team_id: p.teamId, // Usually 100 or 200 for Summoner's Rift
            })),
          },
        }
      });
    } catch (error) {
      console.error("Error saving match to the database:", error);
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
