import prisma from "../db/prisma";
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
      this.latestVersion = versions[0]; // Assuming the latest version is the first item
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
      }
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

    return { ranked, flex };
  }

  async getMatchesIds(puuid: string, count: number = 7): Promise<string[] | null> {
    return leagueRepository.getMatchesIds(puuid, count);
  }

  async getMatchById(matchId: string): Promise<any | null> {
    // Fetch match data from the external source
    const match = await leagueRepository.getMatchById(matchId);
    if (match) {
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
        console.error("Error inserting match into the database:", error);
      }
    }
    return match;
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
    return leagueRepository.getActiveGameByPuuid(puuid);
  }

  async getFeaturedGames(): Promise<any | null> {
    return leagueRepository.getFeaturedGames();
  }

  async getFeaturedSummoner(): Promise<any | null> {
    const featuredGames = await this.getFeaturedGames();
    if (!featuredGames || featuredGames.gameList.length === 0) {
      return null;
    }
    const classics = featuredGames.gameList.filter(game => game.gameMode === 'CLASSIC' || game?.gameMode === "RANKED_SOLO_5x5" || game?.gameMode === 'RANKED_FLEX_SR')
    const games = classics?.length ? classics : featuredGames.gameList;
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomParticipant = randomGame.participants[Math.floor(Math.random() * randomGame.participants.length)];
    return randomParticipant;
  }
}

export default new LeagueService();
