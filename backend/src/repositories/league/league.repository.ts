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

  async getMatchesByIdsSQL(matchIds: string[]): Promise<any[] | null> {
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
          dataVersion: match.data_version,
        },
        info: {
          gameId: match.game_id.toString(), // Ensure gameId is consistent with API type
          gameMode: match.game_mode,
          gameType: match.game_type,
          gameName: match.game_name,
          gameVersion: match.game_version,
          mapId: match.map_id,
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
    try {

      const matchData = matches.map((match) => ({
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
