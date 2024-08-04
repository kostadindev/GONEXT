import sessionRepository from '../repositories/sessions/sessions.repository';
import { ISession, IMessage } from '../types/sessions.types';

class SessionService {
  async fetchAllSessions(): Promise<ISession[]> {
    return await sessionRepository.getAllSessions();
  }

  async fetchSessionById(id: string): Promise<ISession | null> {
    return await sessionRepository.getSessionById(id);
  }

  async addSession(name: string): Promise<ISession> {
    return await sessionRepository.createSession(name);
  }

  async updateSession(id: string, name: string): Promise<ISession | null> {
    return await sessionRepository.updateSession(id, name);
  }

  async deleteSession(id: string): Promise<ISession | null> {
    return await sessionRepository.deleteSession(id);
  }

  async addMessage(sessionId: string, message: IMessage): Promise<ISession | null> {
    return await sessionRepository.addMessage(sessionId, message);
  }

  async updateMessage(sessionId: string, messageId: string, updatedContent: string): Promise<ISession | null> {
    return await sessionRepository.updateMessage(sessionId, messageId, updatedContent);
  }
}

export default new SessionService();
