import mongoose from 'mongoose';
import Session from './sessions.mongo';
import { IMessage, ISession } from '../../types/sessions.types';

class SessionRepository {
  async getAllSessions(userId: string) {
    try {
      return await Session.find({ userId }).exec();
    } catch (error) {
      throw new Error(`Error fetching sessions: ${error}`);
    }
  }

  async getSessionById(id: string, userId: string) {
    try {
      return await Session.findOne({ _id: id, userId }).exec();
    } catch (error) {
      throw new Error(`Error fetching session by ID: ${error}`);
    }
  }

  async createSession(name: string, userId: string, gameId?: string) {
    try {
      const creationTimestamp = new Date();
      return await Session.create({
        name,
        createdAt: creationTimestamp,
        modifiedAt: creationTimestamp,
        messages: [],
        userId,
        gameId
      });
    } catch (error) {
      throw new Error(`Error creating session: ${error}`);
    }
  }

  async updateSession(id: string, name: string, userId: string) {
    try {
      return await Session.findOneAndUpdate(
        { _id: id, userId },
        { name, modifiedAt: new Date() },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating session: ${error}`);
    }
  }

  async deleteSession(id: string, userId: string) {
    try {
      return await Session.findOneAndDelete({ _id: id, userId }).exec();
    } catch (error) {
      throw new Error(`Error deleting session: ${error}`);
    }
  }

  async addMessage(sessionId: string, message: IMessage, userId: string) {
    try {
      const session = await Session.findOne({ _id: sessionId, userId });
      if (!session) {
        throw new Error(`Session not found with ID: ${sessionId}`);
      }
      session.messages.push(message);
      session.modifiedAt = new Date();
      return await session.save();
    } catch (error) {
      throw new Error(`Error adding message: ${error}`);
    }
  }

  async updateMessage(sessionId: string, messageId: string, updatedContent: string, userId: string): Promise<ISession | null> {
    try {
      const session = await Session.findOne({ _id: sessionId, userId });
      if (!session) {
        throw new Error(`Session not found with ID: ${sessionId}`);
      }

      const message = session.messages.find(msg => msg._id.toString() === messageId);
      if (!message) {
        throw new Error(`Message not found with ID: ${messageId}`);
      }

      message.content = updatedContent;
      session.modifiedAt = new Date();
      return await session.save();
    } catch (error) {
      throw new Error(`Error updating message: ${error}`);
    }
  }

  async getSessionByGameId(gameId: string, userId: string): Promise<ISession | null> {
    try {
      return await Session.findOne({ gameId, userId }).exec();
    } catch (error) {
      throw new Error(`Error fetching session by game ID: ${error}`);
    }
  }
}

export default new SessionRepository();
