import { ChampionName } from "../models/league.models";
import { Tip, TipsType } from "../models/tips.models";
import tipsRepository from "../repositories/tips/tips.repository"

class TipsService {
  async getTips(tipsType: TipsType, myChampion: ChampionName, otherChampion: ChampionName): Promise<Tip[]> {
    return await tipsRepository.generateTips(tipsType, myChampion, otherChampion);
  }
}

export default new TipsService();