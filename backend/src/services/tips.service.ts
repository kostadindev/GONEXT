import { ChampionName } from "../models/league.models";
import { Tip, TipsResponse, TipsType } from "../models/tips.models";
import tipsRepository from "../repositories/tips/tips.repository"

class TipsService {
  async getTips(tipsType: TipsType, myChampion: ChampionName, otherChampion: ChampionName): Promise<TipsResponse> {

    let tipsResponse = await tipsRepository.getTips(tipsType, myChampion, otherChampion);
    if (tipsResponse) {
      return tipsResponse;
    }

    tipsResponse = await tipsRepository.generateTips(tipsType, myChampion, otherChampion);
    if (tipsResponse) {
      tipsRepository.saveTips(tipsType, myChampion, otherChampion, tipsResponse?.tips);
    }
    return tipsResponse;
  }
}

export default new TipsService();