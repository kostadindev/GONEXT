import championsRepository from "../repositories/champions/champions.repository";

class ChampionsService {
  async getMatchupTips(summonerChampion: string, enemyChampion: string): Promise<any> {
    return championsRepository.getMatchupTips(summonerChampion, enemyChampion);
  }
}

export default new ChampionsService();