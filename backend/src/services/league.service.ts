import axios, { AxiosError } from 'axios';
import { GameResponse } from '../models/league.models';

export class LeagueService {
  private championsDict: Record<string, string> = {};
  private summonerSpellsDict: Record<string, string | undefined> = {};
  private queuesDict: Record<string, string> = {};
  private headers: Record<string, any> = {};

  constructor() {
    this.initializeDictionaries();
    this.headers = {
      'X-Riot-Token': process.env.LEAGUE_API_KEY
    };
  }

  /**
   * Initializes the champions and summoner spells dictionaries from the Riot Games API.
   */
  private async initializeDictionaries() {
    await Promise.all([this.fetchChampionsDict(), this.fetchSummonerSpellDict(), this.fetchQueueTypes()]);
  }

  /**
   * Fetches and builds a dictionary mapping champion IDs to champion names.
   */
  private async fetchChampionsDict() {
    const url = 'https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json';
    try {
      const response = await axios.get(url);
      const champions = response.data.data;
      Object.keys(champions).forEach(key => {
        this.championsDict[champions[key].key] = champions[key].name;
      });
    } catch (error) {
      console.error('Failed to fetch champions', error);
    }
  }

  private async fetchQueueTypes() {
    const url = 'https://static.developer.riotgames.com/docs/lol/queues.json';
    try {
      const response = await axios.get(url);
      const queues = response.data;
      console.log(queues);
      Object.keys(queues).forEach(key => {
        this.queuesDict[queues[key].queueId] = queues[key].description?.replace(' games', '');
      });
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  }

  /**
   * Fetches and builds a dictionary mapping summoner spell IDs to summoner spell names.
   */
  private async fetchSummonerSpellDict() {
    const url = 'https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/summoner.json';
    try {
      const response = await axios.get(url);
      const spells = response.data.data;
      Object.keys(spells).forEach(key => {
        this.summonerSpellsDict[spells[key].key] = spells[key].id;
      });
    } catch (error) {
      console.error('Failed to fetch summoner spells', error);
    }
  }

  /**
  * Fetches the name of a champion by its ID.
  * @param championId The ID of the champion.
  * @returns The name of the champion.
  */
  getChampionName(championId: string): string {
    return this.championsDict[championId] || 'Unknown Champion';
  }

  /**
   * Fetches the name of a summoner spell by its ID.
   * @param spellId The ID of the summoner spell.
   * @returns The name of the summoner spell.
   */
  getSummonerSpellName(spellId: string): string {
    return this.summonerSpellsDict[spellId] || 'Unknown Spell';
  }

  /**
   * Enriches the game data with additional details such as champion and summoner spell names.
   * @param game The game object containing participant data.
   * @returns The enriched game object.
   */
  getEnrichedGame(game: any): any {
    game.participants = game.participants.map((participant: any) => {
      participant.championName = this.getChampionName(participant.championId);
      participant.summonerSpell1Name = this.getSummonerSpellName(participant.spell1Id);
      participant.summonerSpell2Name = this.getSummonerSpellName(participant.spell2Id);
      return participant;
    });
    return game;
  }

  public async getSummonerIdByPuuid(puuid: string): Promise<string | undefined> {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    try {
      const response = await axios.get(url, {
        headers: this.headers
      });
      return response.data.id as string;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(`HTTP error occurred: ${axiosError.response.status} - ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        console.error('No response was received');
      } else {
        console.error(`An error occurred: ${axiosError.message}`);
      }
      return undefined;
    }
  }

  public async getSummonerStats(puuid: string): Promise<{ ranked: any; flex: any } | undefined> {
    try {
      const summonerId = await this.getSummonerIdByPuuid(puuid);
      if (!summonerId) {
        console.error('Summoner ID could not be retrieved.');
        return undefined;
      }
      const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
      const response = await axios.get(url, {
        headers: this.headers
      });

      let ranked = null;
      let flex = null;
      response.data.forEach((item: any) => {
        if (item.queueType === 'RANKED_SOLO_5x5') {
          ranked = item;
        } else if (item.queueType === 'RANKED_FLEX_SR') {
          flex = item;
        }
      });
      return { ranked, flex };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(`HTTP error occurred: ${axiosError.response.status} - ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        console.error('No response was received');
      } else {
        console.error(`An error occurred: ${axiosError.message}`);
      }
      return undefined;
    }
  }

  public async getMatchesIds(puuid: string, count: number = 5): Promise<string[] | null> {
    try {
      const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
      const response = await axios.get(url, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }


  public async getMatchById(matchId: string): Promise<GameResponse | null> {
    try {
      const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      const response = await axios.get(url, {
        headers: this.headers
      }) as { data: GameResponse };

      response.data.info.queueName = this.queuesDict[response.data.info.queueId]
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
