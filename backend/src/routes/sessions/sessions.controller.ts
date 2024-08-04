import { Request, Response } from 'express';
import SessionService from '../../services/sessions.service';

class SessionController {
  async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = await SessionService.fetchAllSessions();
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getSessionById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const session = await SessionService.fetchSessionById(id);
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async createSession(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newSession = await SessionService.addSession(name);
      res.status(201).json(newSession);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updateSession(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedSession = await SessionService.updateSession(id, name);
      if (updatedSession) {
        res.status(200).json(updatedSession);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async deleteSession(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedSession = await SessionService.deleteSession(id);
      if (deletedSession) {
        res.status(200).json({ message: 'Session deleted successfully' });
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new SessionController();
