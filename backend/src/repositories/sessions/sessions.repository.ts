import Session from './sessions.mongo';

class SessionRepository {
  async getAllSessions() {
    try {
      return await Session.find({}).exec();
    } catch (error) {
      throw new Error(`Error fetching sessions: ${error}`);
    }
  }

  async getSessionById(id: string) {
    try {
      return await Session.findById(id).exec();
    } catch (error) {
      throw new Error(`Error fetching session by ID: ${error}`);
    }
  }

  async createSession(name: string) {
    try {
      const creationTimestamp = new Date();
      return await Session.create({
        name: name,
        creationTimestamp: creationTimestamp,
      });
    } catch (error) {
      throw new Error(`Error creating session: ${error}`);
    }
  }

  async updateSession(id: string, name: string) {
    try {
      return await Session.findByIdAndUpdate(
        id,
        { name: name },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating session: ${error}`);
    }
  }

  async deleteSession(id: string) {
    try {
      return await Session.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting session: ${error}`);
    }
  }
}

export default new SessionRepository();
