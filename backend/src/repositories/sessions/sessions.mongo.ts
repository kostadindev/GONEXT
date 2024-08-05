import mongoose, { Schema, Model } from 'mongoose';
import { IMessage, Role, ISession } from '../../types/sessions.types';

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: Role, required: true },
  content: { type: String, required: true }
});

const sessionSchema = new Schema<ISession>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  messages: { type: [messageSchema], default: [] },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  gameId: { type: String, required: false }
});

const Session: Model<ISession> = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
