import { Response } from 'express';
import chatbotService from '../../services/chatbot.service';
import { AuthenticatedRequest } from '../../types/misc.types';

class ChatbotController {
  /**
   * Send a chat message.
   */
  async sendMessage(req: AuthenticatedRequest, res: Response) {
    const { sessionId } = req.params;
    const { query, match } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      const response = await chatbotService.sendMessage(sessionId, query, match);
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ChatbotController();
