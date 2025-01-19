import { Document } from 'mongoose';
import { LLMOptions } from './llm.models';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Languages {
  Englsih = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  Dutch = 'nl',
  Portuguese = 'pt',
  Russian = 'ru',
  Chinese = 'zh',
  Japanese = 'ja',
  Korean = 'ko',
  Arabic = 'ar',
  Hindi = 'hi',
  Bulgarian = 'bg'
}

export const DEFAULT_LANGUAGE = Languages.Englsih;


export interface IUser extends Document {
  googleId: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
  llm: LLMOptions;
  theme: Themes;
  language: Languages;
}