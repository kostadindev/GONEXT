import { fetchData, postData } from "./reusable-api";

/**
 * Fetch a game overview based on the provided model, match, and language.
 * 
 * @param model - The model to use for the game overview (e.g., "gemini-2.0-flash").
 * @param match - Optional match data to include in the request.
 * @param language - The language for the game overview (e.g., "en").
 * @returns The game overview data or an error if the operation fails.
 */
export const fetchGameOverview = async (match: Record<string, any>) => {
  return await postData("game-overview", { match });
};

