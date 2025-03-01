import { LLMOptions } from "../../models/llm.models";
import { Languages, Themes } from "../../models/users.models";
import usersService from "../../services/users.service";
import { AuthenticatedRequest } from "../../types/misc.types";
import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

class UsersController {
  constructor() {
    // Bind methods to the class instance
    this.updateUserLLM = this.updateUserLLM.bind(this);
    this.updateUserLanguage = this.updateUserLanguage.bind(this);
    this.updateUserTheme = this.updateUserTheme.bind(this);
  }

  /**
   * Update the LLM of a user.
   * @param req - HTTP AuthenticatedRequest object.
   * @param res - HTTP response object.
   */
  async updateUserLLM(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?._id;
    const { llm } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!llm) {
      return res.status(400).json({ message: "LLM option is required" });
    }

    try {
      const updatedUser = await usersService.updateLLM(userId, llm as LLMOptions);

      // Regenerate JWT with updated user data
      const token = this.generateToken(updatedUser);

      // Set the updated token in the response cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

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
    const userId = req.user?._id;
    const { language } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!language || !Object.values(Languages).includes(language)) {
      return res.status(400).json({ message: "Valid language option is required" });
    }

    try {
      const updatedUser = await usersService.updateLanguage(userId, language as Languages);

      // Regenerate JWT with updated user data
      const token = this.generateToken(updatedUser);

      // Set the updated token in the response cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

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
    const userId = req.user?._id;
    const { theme } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!theme || !Object.values(Themes).includes(theme)) {
      return res.status(400).json({ message: "Valid theme option is required" });
    }

    try {
      const updatedUser = await usersService.updateTheme(userId, theme as Themes);

      // Regenerate JWT with updated user data
      const token = this.generateToken(updatedUser);

      // Set the updated token in the response cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Generate a new JWT for the user.
   * @param user - The updated user object.
   * @returns A signed JWT.
   */
  private generateToken(user: any): string {
    return jwt.sign(
      {
        sub: user.googleId,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        picture: user.picture,
        givenName: user.givenName,
        familyName: user.familyName,
        llm: user.llm,
        theme: user.theme,
        language: user.language,
        _id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
  }
}

export default new UsersController();
