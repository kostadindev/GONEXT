import mongoose, { Schema, Model } from 'mongoose';
import { ITips, Tip } from '../../models/tips.models';


const tipSchema = new Schema<Tip>({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const tipsSchema = new Schema<any>({
  myChampion: { type: String, required: true },
  otherChampion: { type: String, required: true },
  tipsType: { type: String, required: true },
  tips: { type: [tipSchema], default: [] },
});


const Tips: Model<ITips> = mongoose.model<ITips>('Tips', tipsSchema);

export default Tips;
