import sessionRepository from '../repositories/sessions/sessions.repository';
import { ISession, IMessage } from '../types/sessions.types';

class SessionService {
  async fetchAllSessions(userId: string): Promise<ISession[]> {
    return await sessionRepository.getAllSessions(userId);
  }

  async fetchSessionById(id: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.getSessionById(id, userId);
  }

  async addSession(name: string, userId: string): Promise<ISession> {
    return await sessionRepository.createSession(name, userId);
  }

  async updateSession(id: string, name: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.updateSession(id, name, userId);
  }

  async deleteSession(id: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.deleteSession(id, userId);
  }

  async addMessage(sessionId: string, message: IMessage, userId: string): Promise<ISession | null> {
    return await sessionRepository.addMessage(sessionId, message, userId);
  }

  async updateMessage(sessionId: string, messageId: string, updatedContent: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.updateMessage(sessionId, messageId, updatedContent, userId);
  }
}

export default new SessionService();
