import { GameOverviewResponse, LLMOptions } from "../models/llm.models";
import { Languages } from "../models/users.models";
import gameOverviewRepository from "../repositories/game-overview/game-overview.repository";
import leagueService from "./league.service";

class GameOverviewService {
  /**
   * Retrieves a game overview based on the provided parameters.
   * @param {LLMOptions} model - The model to use for generating the game overview.
   * @param {Record<string, any>} match - Optional matching context.
   * @param {Languages} language - The language to use for the response.
   * @returns {Promise<any>} - The game overview data.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async getGameOverview(model: LLMOptions, match: Record<string, any> = {}, language: Languages): Promise<GameOverviewResponse> {
    try {
      const gameOverview = await gameOverviewRepository.getGameOverview(model, match, language);
      const enrichedItems = gameOverview?.response?.recommended_items.map((itemName) => (
        {
          itemId: leagueService.getItemIdByName(itemName),
          itemName: itemName
        }
      ));
      return {
        response: {
          recommended_items: enrichedItems,
          estimated_win_rate: gameOverview?.response?.estimated_win_rate,
          game_summary: gameOverview?.response?.game_summary
        }
      }
    } catch (error) {
      console.error("Error in GameOverviewService while fetching game overview:", error.message);
      throw new Error("Failed to retrieve the game overview.");
    }
  }
}

export default new GameOverviewService();
