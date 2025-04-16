import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
import { GameOverviewMLResponse, GameOverviewResponse, LLMOptions } from "../../models/llm.models";
import { Languages } from "../../models/users.models";

dotenv.config();

class GameOverviewRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = `${process.env.ML_SERVER_URL}/game_overview`;
  }

  /**
   * Sends a request to the game overview endpoint and processes the response.
   * @param {LLMOptions} model - The model to use for generating the game overview.
   * @param {Record<string, any>} match - Optional matching context.
   * @param {Languages} language - The language to use for the response.
   * @returns {Promise<any>} - The response from the game overview endpoint.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async getGameOverview(model: LLMOptions, match: Record<string, any> = {}, language: Languages): Promise<GameOverviewMLResponse> {
    try {
      const response = await axios.post(
        `${this.baseURL}/`,
        {
          model,
          match,
          language,
        }
      );

      return response.data; // Return the response data
    } catch (error) {
      handleAxiosError(error as AxiosError);
      throw new Error("Failed to fetch game overview.");
    }
  }
}

export default new GameOverviewRepository();
