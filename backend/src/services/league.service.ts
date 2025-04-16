import redis from "../db/redis";
import leagueRepository from "../repositories/league/league.repository";

class LeagueService {
  private championsDict: Record<string, { name: string, imageId: string }> = {};
  private summonerSpellsDict: Record<string, string | undefined> = {};
  private queuesDict: Record<string, string> = {};
  private latestVersion: string = '';
  private itemsDict: Record<string, string> = {};

  constructor() {
    this.initializeDictionaries();
  }

  private async initializeDictionaries() {
    await this.fetchLatestVersion();
    await Promise.all([
      this.fetchChampionsDict(),
      this.fetchSummonerSpellDict(),
      this.fetchQueueTypes(),
      this.fetchItemsDict()
    ]);
  }

  private async fetchLatestVersion() {
    const url = 'https://ddragon.leagueoflegends.com/api/versions.json';
    const versions = await leagueRepository.fetchData(url);
    if (Array.isArray(versions) && versions.length > 0) {
      this.latestVersion = versions[0];
    } else {
      throw new Error('Unable to fetch the latest version.');
    }
  }

  private async fetchChampionsDict() {
    if (!this.latestVersion) await this.fetchLatestVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${this.latestVersion}/data/en_US/champion.json`;
    const champions = await leagueRepository.fetchChampionsDict(url);
    Object.keys(champions).forEach((key) => {
      this.championsDict[champions[key].key] = { name: champions[key].name, imageId: champions[key]?.id };
    });
  }

  private async fetchQueueTypes() {
    const url = 'https://static.developer.riotgames.com/docs/lol/queues.json';
    const queues = await leagueRepository.fetchQueueTypes(url);
    Object.keys(queues).forEach((key) => {
      this.queuesDict[queues[key].queueId] = queues[key].description?.replace(' games', '');
    });
  }

  private async fetchSummonerSpellDict() {
    if (!this.latestVersion) await this.fetchLatestVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${this.latestVersion}/data/en_US/summoner.json`;
    const spells = await leagueRepository.fetchSummonerSpellDict(url);
    Object.keys(spells).forEach((key) => {
      this.summonerSpellsDict[spells[key].key] = spells[key].id;
    });
  }

  private async fetchItemsDict() {
    if (!this.latestVersion) await this.fetchLatestVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${this.latestVersion}/data/en_US/item.json`;
    const items = await leagueRepository.fetchData(url);

    if (items?.data) {
      Object.keys(items.data).forEach((itemId) => {
        const itemName = items.data[itemId]?.name?.toLowerCase();
        if (itemName) {
          this.itemsDict[itemName] = itemId;
        }
      });
    } else {
      throw new Error('Unable to fetch items data.');
    }
  }

  getItemIdByName(itemName: string): string | undefined {
    return this.itemsDict[itemName?.toLowerCase()];
  }

  getChampionName(championId: string): string {
    return this.championsDict[championId]?.name || 'Unknown Champion';
  }

  getChampionImageId(championId: string): string {
    return this.championsDict[championId]?.imageId || 'Unknown Champion';
  }

  getSummonerSpellName(spellId: string): string {
    return this.summonerSpellsDict[spellId] || 'Unknown Spell';
  }

  getEnrichedGame(game: any, puuid?: string): any {
    if (puuid) {
      const searchedSummoner = game?.participants.find(p => p?.puuid === puuid);
      game.searchedSummoner = {
        teamId: searchedSummoner?.teamId,
        puuid
      };
    }
    game.participants = game.participants.map((participant: any) => {
      participant.championName = this.getChampionName(participant.championId);
      participant.championImageId = this.getChampionImageId(participant.championId);
      participant.summonerSpell1Name = this.getSummonerSpellName(participant.spell1Id);
      participant.summonerSpell2Name = this.getSummonerSpellName(participant.spell2Id);
      return participant;
    });
    return game;
  }

  async getSummonerIdByPuuid(puuid: string): Promise<string | undefined> {
    return leagueRepository.getSummonerIdByPuuid(puuid);
  }

  async getSummonerStats(puuid: string): Promise<{ ranked: any; flex: any } | undefined> {
    const cacheKey = `summonerStats:${puuid}`;
    try {
      const cachedStats = await redis.get(cacheKey);
      if (cachedStats) {
        return JSON.parse(cachedStats);
      }
    } catch (err) {
      console.warn('Redis unavailable for getSummonerStats cache read:', err.message);
    }

    const summonerId = await this.getSummonerIdByPuuid(puuid);
    if (!summonerId) {
      console.error('Summoner ID could not be retrieved.');
      return undefined;
    }

    const stats = await leagueRepository.getSummonerStats(summonerId);
    let ranked = null;
    let flex = null;
    stats.forEach((item: any) => {
      if (item.queueType === 'RANKED_SOLO_5x5') {
        ranked = item;
      } else if (item.queueType === 'RANKED_FLEX_SR') {
        flex = item;
      }
    });

    const result = { ranked, flex };
    try {
      await redis.set(cacheKey, JSON.stringify(result), { PX: 300000 });
    } catch (err) {
      console.warn('Redis unavailable for getSummonerStats cache write:', err.message);
    }

    return result;
  }

  async getMatchesIds(puuid: string, count: number = 7): Promise<string[] | null> {
    return leagueRepository.getMatchesIds(puuid, count);
  }

  async getMatches(puuid: string, count: number = 7): Promise<any[] | null> {
    const matchIds = await this.getMatchesIds(puuid, count);
    return (await this.getMatchesByIds(matchIds)).map((match: any) => {
      const participants = this.getParticipantsFromMatch(match);
      let participant = match?.info?.participants.find((p: any) => p?.puuid === puuid);
      if (participant) {
        participant = {
          ...participant,
          summonerSpell1Name: this.getSummonerSpellName(participant.summoner1Id?.toString()),
          summonerSpell2Name: this.getSummonerSpellName(participant.summoner2Id?.toString()),
          championImageId: this.getChampionImageId(participant?.championId)
        } as any;
      }
      return {
        win: participant?.win,
        gameCreation: match?.info?.gameCreation,
        gameDuration: match?.info?.gameDuration,
        gameMode: match?.info?.gameMode,
        matchId: match?.metadata?.matchId,
        queueName: this.queuesDict[match?.info?.queueId],
        participant,
        participants
      };
    });
  }

  async getMatchesByIds(matchIds: string[]): Promise<any[] | null> {
    const oldMatches = await leagueRepository.getMatchesByIdsSQL(matchIds);
    const existingMatchIds = oldMatches.map(match => match.metadata.matchId);
    const newMatchIds = matchIds.filter(matchId => !existingMatchIds.includes(matchId));
    const newMatches = (await Promise.all(
      newMatchIds.map((matchId) => leagueRepository.getMatchById(matchId))
    ));
    if (newMatches.length > 0) {
      leagueRepository.saveMatches(newMatches);
    }
    return [...oldMatches, ...newMatches].sort((a, b) => a.info.gameEndTimestamp - b.info.gameEndTimestamp);
  }

  getParticipantsFromMatch(match: any) {
    return match?.info.participants.map((participant: any) => ({
      summonerName: participant?.summonerName,
      teamId: participant?.teamId,
      championName: participant?.championName,
      championImageId: this.getChampionImageId(participant.championId)
    }));
  }

  async getSummonerByRiotId(gameName: string, tagLine: string): Promise<any | null> {
    return leagueRepository.getSummonerByRiotId(gameName, tagLine);
  }

  async getActiveGameByPuuid(puuid: string): Promise<any | null> {
    const cacheKey = `game:${puuid}`;
    try {
      const cachedGame = await redis.get(cacheKey);
      if (cachedGame) {
        return JSON.parse(cachedGame);
      }
    } catch (err) {
      console.warn('Redis unavailable for getActiveGameByPuuid cache read:', err.message);
    }

    const game = await leagueRepository.getActiveGameByPuuid(puuid);
    if (!game) {
      return null;
    }
    const enrichedGame = this.getEnrichedGame(game, puuid);

    try {
      await redis.set(cacheKey, JSON.stringify(enrichedGame), { PX: 180000 });
    } catch (err) {
      console.warn('Redis unavailable for getActiveGameByPuuid cache write:', err.message);
    }

    return enrichedGame;
  }

  async getFeaturedGames(): Promise<any | null> {
    return leagueRepository.getFeaturedGames();
  }

  async getFeaturedSummoner(): Promise<any | null> {
    const featuredGames = await this.getFeaturedGames();
    if (!featuredGames || featuredGames.gameList.length === 0) {
      return null;
    }
    const classics = featuredGames.gameList.filter(game =>
      game.gameMode === 'CLASSIC' || game?.gameMode === "RANKED_SOLO_5x5" || game?.gameMode === 'RANKED_FLEX_SR'
    );
    const games = classics?.length ? classics : featuredGames.gameList;
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomParticipant = randomGame.participants[Math.floor(Math.random() * randomGame.participants.length)];
    return randomParticipant;
  }
}

export default new LeagueService();
