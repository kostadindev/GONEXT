import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
import { Tip, TipsType } from "../../models/tips.models";
import { ChampionName } from "../../models/league.models";
dotenv.config();

class TipsRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://127.0.0.1:8000/tips"; // FastAPI base URL TODO make an env variable
  }

  async generateTips(tipsType: TipsType, myChampion: ChampionName, otherChampion: ChampionName): Promise<Tip[]> {
    try {

      const response = await axios.post(`${this.baseURL}/`, {
        tips_type: tipsType,
        my_champion: myChampion,
        other_champion: otherChampion
      });

      const tipsResponse = response.data?.response;
      if (tipsResponse) {
        return tipsResponse;
      } else {
        throw new Error("Invalid response from the tips API.");
      }
    } catch (error) {
      handleAxiosError(error as AxiosError);
      throw new Error("Failed generating tips.");
    }
  }
}

export default new TipsRepository();
