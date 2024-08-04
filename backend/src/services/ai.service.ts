import aiRepository from "../repositories/ai/ai.repository";

class AIService {
  async getMatchupTips(summonerChampion: string, enemyChampion: string) {
    return aiRepository.fetchMatchupTips(summonerChampion, enemyChampion);
  }
}

export default new AIService();