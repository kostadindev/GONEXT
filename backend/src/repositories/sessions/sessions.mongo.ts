
import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

const sessionSchema = new Schema<ISession>({
  name: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
});

const Session = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
