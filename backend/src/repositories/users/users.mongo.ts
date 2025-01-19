import { Schema, model } from 'mongoose';
import { IUser } from '../../models/users.models';
import { LLMOptions } from '../../models/llm.models';

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  llm: {
    type: String,
    required: true,
    enum: Object.values(LLMOptions),
    default: LLMOptions.GEMINI_FLASH,
  },
  theme: { type: String, required: true, default: 'light' },
  language: { type: String, required: true, default: 'en' }
});

export const User = model<IUser>('User', userSchema);
