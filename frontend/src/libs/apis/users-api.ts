import { putData } from "./reusable-api";

/**
 * Update the user's LLM preference.
 * 
 * @param llm - The LLM option to set for the user (e.g., "Gemini" or "GPT").
 * @returns The updated user object or an error if the operation fails.
 */
export const updateUserLLM = async (llm: string) => {
  return await putData("users/llm", { llm });
};

/**
 * Update the user's language preference.
 * 
 * @param language - The language to set for the user (must match supported languages).
 * @returns The updated user object or an error if the operation fails.
 */
export const updateUserLanguage = async (language: string) => {
  return await putData("users/language", { language });
};

/**
 * Update the user's theme preference.
 * 
 * @param theme - The theme option to set for the user (e.g., "light" or "dark").
 * @returns The updated user object or an error if the operation fails.
 */
export const updateUserTheme = async (theme: string) => {
  return await putData("users/theme", { theme });
};
