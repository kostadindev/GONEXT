import chatbotRepository from "../repositories/chatbot/chatbot.repository";
import { Readable } from "stream";

class ChatbotService {
  /**
   * Sends a message to the chatbot and retrieves a response stream.
   * @param {string} threadId - The thread ID for the conversation context.
   * @param {string} query - The user's query or message.
   * @returns {Promise<Readable>} - The chatbot's response stream.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async sendMessage(threadId: string, query: string, match?: Record<string, any>): Promise<Readable> {
    try {
      return await chatbotRepository.sendMessage(threadId, query, match);
    } catch (error) {
      console.error("Error in ChatbotService while sending message:", error.message);
      throw new Error("Failed to process the chatbot request.");
    }
  }
}

export default new ChatbotService();
