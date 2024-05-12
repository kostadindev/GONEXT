import axios from 'axios';

export class LeagueService {
  private championsDict: Record<string, string> = {};
  private summonerSpellsDict: Record<string, string> = {};

  constructor() {
    this.initializeDictionaries();
  }

  /**
   * Initializes the champions and summoner spells dictionaries from the Riot Games API.
   */
  private async initializeDictionaries() {
    await Promise.all([this.fetchChampionsDict(), this.fetchSummonerSpellDict()]);
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
}

