import { ISession } from "../repositories/sessions/sessions.mongo";
import sessionRepository from "../repositories/sessions/sessions.repository";

class SessionService {
  async fetchAllSessions(): Promise<ISession[]> {
    return sessionRepository.getAllSessions();
  }

  async fetchSessionById(id: string): Promise<ISession | null> {
    return sessionRepository.getSessionById(id);
  }

  async addSession(name: string): Promise<ISession> {
    return sessionRepository.createSession(name);
  }

  async updateSession(id: string, name: string): Promise<ISession | null> {
    return sessionRepository.updateSession(id, name);
  }

  async deleteSession(id: string): Promise<ISession | null> {
    return sessionRepository.deleteSession(id);
  }
}

export default new SessionService();
