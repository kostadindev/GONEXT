import { AIService } from '../../services/ai.service';
const aiService = new AIService();

class ChampionsRepository {
  async getMatchupTips(summonerChampion: string, enemyChampion: string): Promise<any> {
    try {
      const tips = await aiService.getMatchupTips(summonerChampion, enemyChampion);
      return tips // Placeholder for actual implementation
    } catch (error) {
      throw new Error(`Error fetching matchup tips: ${error}`);
    }
  }
}

export default new ChampionsRepository();