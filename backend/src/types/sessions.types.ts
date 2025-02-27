import { Document, Types } from 'mongoose';

export enum Role {
  USER = 'user',
  SYSTEM = 'system'
}

export interface IMessage extends Document {
  role: Role;
  content: string;
  _id: Types.ObjectId;  // Updated to use ObjectId type
}

export interface ISession extends Document {
  name: string;
  createdAt: Date;
  modifiedAt: Date;
  messages: IMessage[];
  userId: string;
  gameId?: string;  // Optional matchId, assumed to be a string
  _id: Types.ObjectId;  // Updated to use ObjectId type
}
