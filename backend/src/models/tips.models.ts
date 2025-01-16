import { Types } from "mongoose";

export type TipsType = 'matchup' | 'synergy';

export interface Tip {
  title: string,
  description: string,
}

export interface TipsResponse {
  tips: Tip[]
}

export interface ITip extends Document {
  title: string,
  description: string,
  _id: Types.ObjectId;  // Updated to use ObjectId type
}

export interface ITips extends Document {
  myChampion: string,
  otherChampion: string,
  tipsType: TipsType,
  tips: ITip[],
  _id: Types.ObjectId;  // Updated to use ObjectId type
}