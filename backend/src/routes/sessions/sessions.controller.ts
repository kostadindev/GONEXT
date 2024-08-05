import { Response } from 'express';
import sessionService from '../../services/sessions.service';
import { IMessage } from '../../types/sessions.types';
import { AuthenticatedRequest } from '../../types/misc.types';
import { NEW_SESSION_NAME } from '../../constants/session.constants';

class SessionController {
  async getAllSessions(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?._id; // Extract userId from request
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const sessions = await sessionService.fetchAllSessions(userId);
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getSessionById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    try {
      const userId = req.user?._id; // Extract userId from request
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const session = await sessionService.fetchSessionById(id, userId);
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async createSession(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, gameId } = req.body;
      const userId = req.user?._id; // Extract userId from request
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const newSession = await sessionService.addSession(name, userId, gameId);
      res.status(201).json(newSession);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updateSession(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const userId = req.user?._id; // Extract userId from request
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const updatedSession = await sessionService.updateSession(id, name, userId);
      if (updatedSession) {
        res.status(200).json(updatedSession);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async deleteSession(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    try {
      const userId = req.user?._id; // Extract userId from request
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const deletedSession = await sessionService.deleteSession(id, userId);
      if (deletedSession) {
        res.status(200).json({ message: 'Session deleted successfully' });
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async addMessage(req: AuthenticatedRequest, res: Response) {
    const { sessionId } = req.params;
    const { role, content } = req.body;

    if (!role || !content) {
      return res.status(400).json({ message: 'Role and content are required' });
    }

    const userId = req.user?._id; // Extract userId from request
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const message: IMessage = {
      role,
      content
    } as IMessage; // Type assertion for simplicity

    try {
      const updatedSession = await sessionService.addMessage(sessionId, message, userId);
      if (updatedSession) {
        res.status(200).json(updatedSession);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMessage(req: AuthenticatedRequest, res: Response) {
    const { sessionId, messageId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const userId = req.user?._id; // Extract userId from request
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      const updatedSession = await sessionService.updateMessage(sessionId, messageId, content, userId);
      if (updatedSession) {
        res.status(200).json(updatedSession);
      } else {
        res.status(404).json({ message: 'Session or message not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Finds the existing session by id or creates a new one if no such exists.
   */
  async getSessionByGameId(req: AuthenticatedRequest, res: Response) {
    const { gameId } = req.params;
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const session = await sessionService.fetchSessionByGameId(gameId, userId);

      if (session) {
        res.status(200).json(session);
      } else {
        const newSession = await sessionService.addSession(NEW_SESSION_NAME, userId, gameId);
        res.status(201).json(newSession);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SessionController();
