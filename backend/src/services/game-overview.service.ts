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
      // TODO: Remove mock data and use real ML response
      // const gameOverview = await gameOverviewRepository.getGameOverview(model, match, language);

      // Mock data for demonstrating the new item build sequence feature
      const mockItemBuild = {
        finalBuild: [
          { itemId: "3020", itemName: "Sorcerer's Shoes" },
          { itemId: "6653", itemName: "Liandry's Anguish" },
          { itemId: "3157", itemName: "Zhonya's Hourglass" },
          { itemId: "3135", itemName: "Void Staff" },
          { itemId: "3089", itemName: "Rabadon's Deathcap" },
          { itemId: "3102", itemName: "Banshee's Veil" }
        ],
        buildSequence: [
          { itemId: "1001", itemName: "Boots of Speed", step: 1 },
          { itemId: "1052", itemName: "Amplifying Tome", step: 1 },
          { itemId: "1052", itemName: "Amplifying Tome", step: 2 },
          { itemId: "3802", itemName: "Lost Chapter", step: 2 },
          { itemId: "3020", itemName: "Sorcerer's Shoes", step: 3 },
          { itemId: "6653", itemName: "Liandry's Anguish", step: 4 },
          { itemId: "1058", itemName: "Needlessly Large Rod", step: 5 },
          { itemId: "2420", itemName: "Seeker's Armguard", step: 5 },
          { itemId: "3157", itemName: "Zhonya's Hourglass", step: 6 },
          { itemId: "1026", itemName: "Blasting Wand", step: 7 },
          { itemId: "3135", itemName: "Void Staff", step: 8 },
          { itemId: "1058", itemName: "Needlessly Large Rod", step: 9 },
          { itemId: "3089", itemName: "Rabadon's Deathcap", step: 10 },
          { itemId: "1033", itemName: "Null-Magic Mantle", step: 11 },
          { itemId: "3102", itemName: "Banshee's Veil", step: 12 }
        ]
      };

      return {
        response: {
          recommended_items: mockItemBuild,
          estimated_win_rate: 67.5,
          game_summary: "Strong team composition with good scaling potential. Your team has excellent engage potential with Malphite and solid late-game damage from your ADC. Focus on farming safely in the early game and look for teamfight opportunities around objectives. Consider warding river bushes to prevent ganks and coordinate with your jungler for successful ganks on overextended enemies."
        }
      }
    } catch (error) {
      console.error("Error in GameOverviewService while fetching game overview:", error.message);
      throw new Error("Failed to retrieve the game overview.");
    }
  }
}

export default new GameOverviewService();
