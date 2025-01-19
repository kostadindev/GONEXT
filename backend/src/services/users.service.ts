import userRepository from "../repositories/users/users.repository"; // Assuming repository path matches your structure
import { Themes, Languages } from "../models/users.models"; // Assuming models path matches your structure
import { LLMOptions } from "../models/llm.models";

class UsersService {
  /**
   * Update the LLM of a user by their Google ID.
   * @param userId - The ID of the user.
   * @param llm - The LLM option to update.
   * @returns Updated user document.
   */
  async updateLLM(userId: string, llm: LLMOptions) {
    return await userRepository.updateUserLLM(userId, llm);
  }

  /**
   * Update the theme of a user by their Google ID.
   * @param userId - The ID of the user.
   * @param theme - The theme to update (light or dark).
   * @returns Updated user document.
   */
  async updateTheme(userId: string, theme: Themes) {
    return await userRepository.updateUserTheme(userId, theme);
  }

  /**
   * Update the language of a user by their Google ID.
   * @param userId - The ID of the user.
   * @param language - The language to update.
   * @returns Updated user document.
   */
  async updateLanguage(userId: string, language: Languages) {
    return await userRepository.updateUserLanguage(userId, language);
  }
}

export default new UsersService();
