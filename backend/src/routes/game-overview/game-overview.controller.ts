import { Response } from "express";
import gameOverviewService from "../../services/game-overview.service";
import { AuthenticatedRequest } from "../../types/misc.types";
import { DEFAULT_LLM } from "../../models/llm.models";
import { DEFAULT_LANGUAGE } from "../../models/users.models";

class GameOverviewController {
  /**
   * Retrieve a game overview and send the response.
   */
  async getGameOverview(req: AuthenticatedRequest, res: Response) {
    const { match } = req.body;

    // const userId = req.user?._id;
    // if (!userId) {
    //   return res.status(401).json({ message: "User not authenticated" });
    // }

    const model = req.user?.llm || DEFAULT_LLM;
    const language = req.user?.language || DEFAULT_LANGUAGE;

    try {
      const overview = await gameOverviewService.getGameOverview(model, match, language);
      res.status(200).json(overview);
    } catch (error) {
      console.error("Error in GameOverviewController while fetching game overview:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new GameOverviewController();
