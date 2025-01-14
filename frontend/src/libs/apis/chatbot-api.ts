import { postData } from "./reusable-api";

/**
 * Function to send a chat message to the chatbot.
 * @param {string} sessionId - The session ID for the conversation context.
 * @param {Record<string, any>} messageData - The message data containing the query.
 * @returns {Promise<any>} - The chatbot's response.
 */
export const sendChatMessage = async (sessionId: string, messageData: Record<string, any>) => {
  return await postData(`chatbot/${sessionId}/chat`, messageData);
};
