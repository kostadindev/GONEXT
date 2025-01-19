import { LLMOptions } from "../../models/llm.models";
import { Languages, Themes } from "../../models/users.models";
import usersService from "../../services/users.service";
import { AuthenticatedRequest } from "../../types/misc.types";
import { Response } from 'express';

class UsersController {
  /**
   * Update the LLM of a user.
   * @param req - HTTP AuthenticatedRequest object.
   * @param res - HTTP response object.
   */
  async updateUserLLM(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?._id
    const { llm } = req.body; // LLM option passed in the AuthenticatedRequest body

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!llm) {
      return res.status(400).json({ message: "LLM option is required" });
    }

    try {
      const updatedUser = await usersService.updateLLM(userId, llm as LLMOptions);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update the language preference of a user.
   * @param req - HTTP AuthenticatedRequest object.
   * @param res - HTTP response object.
   */
  async updateUserLanguage(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?._id
    const { language } = req.body; // Language option passed in the AuthenticatedRequest body

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!language || !Object.values(Languages).includes(language)) {
      return res.status(400).json({ message: "Valid language option is required" });
    }

    try {
      const updatedUser = await usersService.updateLanguage(userId, language as Languages);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update the theme preference of a user.
   * @param req - HTTP AuthenticatedRequest object.
   * @param res - HTTP response object.
   */
  async updateUserTheme(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?._id
    const { theme } = req.body; // Theme option passed in the AuthenticatedRequest body

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!theme || !Object.values(Themes).includes(theme)) {
      return res.status(400).json({ message: "Valid theme option is required" });
    }

    try {
      const updatedUser = await usersService.updateTheme(userId, theme as Themes);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UsersController();
