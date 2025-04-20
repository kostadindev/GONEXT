import sessionRepository from '../repositories/sessions/sessions.repository';
import { ISession, IMessage } from '../types/sessions.types';

class SessionService {
  async fetchAllSessions(userId: string): Promise<ISession[]> {
    return await sessionRepository.getAllSessions(userId);
  }

  async fetchSessionById(id: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.getSessionById(id, userId);
  }

  async addSession(name: string, userId: string, gameId?: string): Promise<ISession> {
    return await sessionRepository.createSession(name, userId, gameId);
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

  async fetchSessionByGameId(gameId: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.getSessionByGameId(gameId, userId);
  }

  async clearMessages(sessionId: string, userId: string): Promise<ISession | null> {
    return await sessionRepository.clearMessages(sessionId, userId);
  }
}

export default new SessionService();
