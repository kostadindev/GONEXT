import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
import { Readable } from "stream";
import { LLMOptions } from "../../models/llm.models";
import { Languages } from "../../models/users.models";

dotenv.config();

class ChatBotRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = `${process.env.ML_SERVER_URL}`;
  }

  /**
   * Sends a query to the FastAPI chatbot endpoint and processes the streaming response.
   * @param {string} threadId - The thread ID for the conversation context.
   * @param {string} query - The user's message or query to the chatbot.
   * @param {Record<string, any>} match - Optional matching context.
   * @param {LLMOptions} model - Optional model to use for the chatbot.
   * @returns {Promise<Readable>} - The response stream from the chatbot.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async sendMessage(threadId: string, query: string, match?: Record<string, any>, model?: LLMOptions, language?: Languages): Promise<Readable> {
    try {
      const response = await axios.post(
        `${this.baseURL}/chatbot`,
        {
          thread_id: threadId,
          query,
          match,
          model,
          language
        },
        {
          responseType: "stream", // This ensures Axios handles the response as a stream.
        }
      );

      return response.data as Readable; // Return the readable stream
    } catch (error) {
      handleAxiosError(error as AxiosError);
      throw new Error("Failed to send message to the chatbot.");
    }
  }

  /**
 * Fetches follow-up suggestions based on conversation context, match, and optional model.
 */
  async getFollowUpSuggestions(
    messages: Array<{ role: string; content: string }>,
    match?: Record<string, any>,
    context?: Record<string, any>,
    model?: LLMOptions
  ): Promise<string[]> {
    try {
      const response = await axios.post(`${this.baseURL}/suggestions`, {
        messages,
        match,
        context,
        model,
      });

      return response.data as string[];
    } catch (error) {
      handleAxiosError(error as AxiosError);
      throw new Error("Failed to fetch follow-up suggestions.");
    }
  }

}

export default new ChatBotRepository();
