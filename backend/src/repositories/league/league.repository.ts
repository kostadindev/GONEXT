import axios, { AxiosError } from 'axios';
import dotenv from "dotenv";
import { handleAxiosError } from '../../utils/axiosErrorHandler';
import prisma from '../../db/prisma';
dotenv.config();

export type Platform = 'BR1' | 'EUN1' | 'EUW1' | 'JP1' | 'KR' | 'LA1' | 'LA2' | 'NA1' | 'OC1' | 'TR1' | 'RU' | 'PH2' | 'SG2' | 'TH2' | 'TW2' | 'VN2';
export type Region = 'AMERICAS' | 'ASIA' | 'EUROPE' | 'SEA';

const PLATFORM_TO_HOST: Record<Platform, string> = {
  BR1: 'br1.api.riotgames.com',
  EUN1: 'eun1.api.riotgames.com',
  EUW1: 'euw1.api.riotgames.com',
  JP1: 'jp1.api.riotgames.com',
  KR: 'kr.api.riotgames.com',
  LA1: 'la1.api.riotgames.com',
  LA2: 'la2.api.riotgames.com',
  NA1: 'NA1.api.riotgames.com',
  OC1: 'oc1.api.riotgames.com',
  TR1: 'tr1.api.riotgames.com',
  RU: 'ru.api.riotgames.com',
  PH2: 'ph2.api.riotgames.com',
  SG2: 'sg2.api.riotgames.com',
  TH2: 'th2.api.riotgames.com',
  TW2: 'tw2.api.riotgames.com',
  VN2: 'vn2.api.riotgames.com'
};

const REGION_TO_HOST: Record<Region, string> = {
  AMERICAS: 'americas.api.riotgames.com',
  ASIA: 'asia.api.riotgames.com',
  EUROPE: 'europe.api.riotgames.com',
  SEA: 'sea.api.riotgames.com'
};

export const PLATFORM_TO_REGION: Record<Platform, Region> = {
  BR1: 'AMERICAS',
  EUN1: 'EUROPE',
  EUW1: 'EUROPE',
  JP1: 'ASIA',
  KR: 'ASIA',
  LA1: 'AMERICAS',
  LA2: 'AMERICAS',
  NA1: 'AMERICAS',
  OC1: 'SEA',
  TR1: 'EUROPE',
  RU: 'EUROPE',
  PH2: 'SEA',
  SG2: 'SEA',
  TH2: 'SEA',
  TW2: 'SEA',
  VN2: 'SEA'
};

class LeagueRepository {
  private headers: Record<string, any> = {
    'X-Riot-Token': process.env.LEAGUE_API_KEY,
  };

  private getPlatformUrl(platform: Platform, endpoint: string): string {
    return `https://${PLATFORM_TO_HOST[platform]}/${endpoint}`;
  }

  private getRegionUrl(region: Region, endpoint: string): string {
    return `https://${REGION_TO_HOST[region]}/${endpoint}`;
  }

  // Helper method to check database connectivity
  private async isDbConnected(): Promise<boolean> {
    try {
      // This simple query will succeed if the connection is alive
      await prisma.$queryRaw`SELECT 1;`;
      return true;
    } catch (error) {
      console.error('Postgresql connection not alive');
      return false;
    }
  }

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

  async getSummonerIdByPuuid(puuid: string, platform: Platform = 'NA1'): Promise<string | undefined> {
    const url = this.getPlatformUrl(platform, `lol/summoner/v4/summoners/by-puuid/${puuid}`);
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

  async getSummonerStats(summonerId: string, platform: Platform = 'NA1'): Promise<any> {
    const url = this.getPlatformUrl(platform, `lol/league/v4/entries/by-summoner/${summonerId}`);
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

  async getMatchesIds(puuid: string, count: number, platform: Platform = 'NA1'): Promise<string[] | null> {
    const region = PLATFORM_TO_REGION[platform];
    const url = this.getRegionUrl(region, `lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`);
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

  async getMatchById(matchId: string, platform: Platform = 'NA1'): Promise<any | null> {
    const region = PLATFORM_TO_REGION[platform];
    const url = this.getRegionUrl(region, `lol/match/v5/matches/${matchId}`);
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

  async getMatchesByIdsSQL(matchIds: string[]): Promise<any[] | null> {
    // Check if database connection is alive
    if (!(await this.isDbConnected())) {
      console.error('Skipping database query: connection not alive.');
      return [];
    }

    const matches = await prisma.match.findMany({
      where: { match_id: { in: matchIds } },
      include: {
        participants: true,
      },
    });

    const deserializedMatches = matches.map((match) => {
      // Reconstruct participants
      const participants = match.participants.map((participant) => ({
        puuid: participant.puuid,
        summonerId: participant.summoner_id,
        summonerName: participant.summoner_name,
        individualPosition: participant.team_position,
        championId: participant.champion_id,
        championName: participant.champion_name,
        kills: participant.kills,
        deaths: participant.deaths,
        assists: participant.assists,
        goldEarned: participant.gold_earned,
        totalDamageDealt: Number(participant.total_damage_dealt), // convert BigInt to number
        totalDamageTaken: Number(participant.total_damage_taken),
        visionScore: participant.vision_score,
        win: participant.win,
        teamId: participant.team_id,
        // New item fields:
        item0: participant.item0,
        item1: participant.item1,
        item2: participant.item2,
        item3: participant.item3,
        item4: participant.item4,
        item5: participant.item5,
        item6: participant.item6,
        summoner1Id: participant.summoner_1_id,
        summoner2Id: participant.summoner_2_id,
      }));

      // Reconstruct match structure
      return {
        metadata: {
          matchId: match.match_id,
          dataVersion: match?.data_version,
        },
        info: {
          gameId: match.game_id.toString(), // Ensure gameId is consistent with API type
          gameMode: match.game_mode,
          gameType: match.game_type,
          gameName: match.game_name,
          gameVersion: match.game_version,
          mapId: match.map_id,
          queueId: match.queue_id,
          endOfGameResult: match.end_of_game_result,
          gameCreation: Number(match.game_creation), // Convert BigInt to number
          gameStartTimestamp: Number(match.game_start_time),
          gameEndTimestamp: Number(match.game_end_time),
          gameDuration: match.game_duration,
          participants: participants,
        },
      };
    });

    return deserializedMatches;
  }

  async saveMatches(matches: any[]): Promise<void> {
    // Check if database connection is alive
    if (!(await this.isDbConnected())) {
      console.error('Skipping saving matches: database connection not alive.');
      return;
    }

    try {
      const matchData = matches.map((match) => ({
        match_id: match.metadata.matchId,
        data_version: match?.metadata?.dataVersion,
        queue_id: match.info.queueId,
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
            item0: p.item0,
            item1: p.item1,
            item2: p.item2,
            item3: p.item3,
            item4: p.item4,
            item5: p.item5,
            item6: p.item6,
            summoner_1_id: p.summoner1Id,
            summoner_2_id: p.summoner2Id,
          })),
        },
      }));

      // Insert new matches with their participants
      for (const data of matchData) {
        await prisma.match.create({ data });
      }

      console.log('New matches with participants saved successfully.');
    } catch (error) {
      console.error('Error saving matches to the database:', error);
    }
  }

  async getSummonerByRiotId(gameName: string, tagLine: string, region: Region = 'AMERICAS'): Promise<any | null> {
    const url = this.getRegionUrl(region, `riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
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

  async getActiveGameByPuuid(puuid: string, platform: Platform = 'NA1'): Promise<any | null> {
    const url = this.getPlatformUrl(platform, `lol/spectator/v5/active-games/by-summoner/${puuid}`);
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

  async getFeaturedGames(platform: Platform = 'NA1'): Promise<any | null> {
    const url = this.getPlatformUrl(platform, 'lol/spectator/v5/featured-games');
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
