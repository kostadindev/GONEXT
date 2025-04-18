import { LLMOptions } from "../models/llm.models";
import { Languages } from "../models/users.models";
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
  async sendMessage(threadId: string, query: string, match?: Record<string, any>, model?: LLMOptions, language?: Languages): Promise<Readable> {
    try {
      return await chatbotRepository.sendMessage(threadId, query, match, model, language);
    } catch (error) {
      console.error("Error in ChatbotService while sending message:", error.message);
      throw new Error("Failed to process the chatbot request.");
    }
  }

  /**
 * Retrieves follow-up question suggestions from the chatbot server.
 */
  async getFollowUpSuggestions(
    messages: Array<{ role: string; content: string }>,
    match?: Record<string, any>,
    context?: Record<string, any>,
    model?: LLMOptions
  ): Promise<string[]> {
    try {
      return await chatbotRepository.getFollowUpSuggestions(messages, match, context, model);
    } catch (error) {
      console.error("Error in ChatbotService while getting suggestions:", error.message);
      throw new Error("Failed to fetch follow-up suggestions.");
    }
  }

}

export default new ChatbotService();
