import chatbotRepository from "../repositories/chatbot/chatbot.repository";

class ChatbotService {
  /**
   * Sends a message to the chatbot and retrieves a response.
   * @param {string} threadId - The thread ID for the conversation context.
   * @param {string} query - The user's query or message.
   * @returns {Promise<string>} - The chatbot's response.
   * @throws {Error} - If the request fails or the response is invalid.
   */
  async sendMessage(threadId: string, query: string, match?: Record<string, any>): Promise<string> {
    try {
      const response = await chatbotRepository.sendMessage(threadId, query, match);
      return response;
    } catch (error) {
      console.error("Error in ChatbotService while sending message:", error.message);
      throw new Error("Failed to process the chatbot request.");
    }
  }
}

export default new ChatbotService();
