import { ChampionName } from "../models/league.models";
import { Tip, TipsResponse, TipsType } from "../models/tips.models";
import tipsRepository from "../repositories/tips/tips.repository"

class TipsService {

  /**
   * Steps:
   * 1. Attempts to fetch existing tips from the repository.
   *    - If tips are found, they are returned immediately.
   * 2. If no tips are found, it generates new tips using the repository's generateTips method.
   *    - The newly generated tips are saved back to the repository for future use.
   * 3. Returns the newly generated tips if no pre-existing tips were available.
   */
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