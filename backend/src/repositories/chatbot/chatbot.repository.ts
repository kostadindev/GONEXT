import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
dotenv.config();

class ChatBotRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://127.0.0.1:8000/chatbot"; // FastAPI base URL TODO make an env variable
  }

  /**
   * Sends a query to the FastAPI chatbot endpoint and retrieves the response.
   * @param {string} threadId - The thread ID for the conversation context.
   * @param {string} query - The user's message or query to the chatbot.
   * @returns {Promise<string>} - The chatbot's response.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async sendMessage(threadId: string, query: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseURL}/`, {
        thread_id: threadId,
        query: query,
      });

      const chatbotResponse = response.data?.response;
      if (chatbotResponse) {
        return chatbotResponse;
      } else {
        throw new Error("Invalid response from the chatbot API.");
      }
    } catch (error) {
      handleAxiosError(error as AxiosError);
      throw new Error("Failed to send message to the chatbot.");
    }
  }
}

export default new ChatBotRepository();
