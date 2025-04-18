import { Response } from "express";
import chatbotService from "../../services/chatbot.service";
import { AuthenticatedRequest } from "../../types/misc.types";
import { DEFAULT_LLM } from "../../models/llm.models";
import { DEFAULT_LANGUAGE } from "../../models/users.models";

class ChatbotController {
  /**
   * Send a chat message and stream the response.
   */
  async sendMessage(req: AuthenticatedRequest, res: Response) {
    const { sessionId } = req.params;
    const { query, match } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // const userId = req.user?._id;
    // if (!userId) {
    //   return res.status(401).json({ message: "User not authenticated" });
    // }
    const model = req.user?.llm || DEFAULT_LLM;
    const language = req.user?.language || DEFAULT_LANGUAGE;
    try {
      const stream = await chatbotService.sendMessage(sessionId, query, match, model, language);

      // Set appropriate headers for streaming
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Transfer-Encoding", "chunked");

      // Pipe the stream directly to the response
      stream.pipe(res);

      // Handle stream errors
      stream.on("error", (error) => {
        console.error("Error while streaming response:", error.message);
        res.status(500).end("Error while streaming response.");
      });

      // End the response when the stream ends
      stream.on("end", () => {
        res.end();
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
 * Suggest follow-up questions based on current chat context.
 */
  async getFollowUpSuggestions(req: AuthenticatedRequest, res: Response) {
    const { messages, match, context } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Messages array is required" });
    }

    const model = req.user?.llm || DEFAULT_LLM;

    try {
      const suggestions = await chatbotService.getFollowUpSuggestions(messages, match, context, model);
      return res.status(200).json({ suggestions });
    } catch (error) {
      console.error("Error getting follow-up suggestions:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

}

export default new ChatbotController();
