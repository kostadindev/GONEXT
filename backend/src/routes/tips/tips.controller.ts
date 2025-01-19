import { Response } from "express";
import tipsService from "../../services/tips.service";
import { AuthenticatedRequest } from "../../types/misc.types";
import { DEFAULT_LANGUAGE } from "../../models/users.models";
import { TipsType } from "../../models/tips.models";

export class TipsController {
  async getTips(req: AuthenticatedRequest, res: Response) {
    try {
      const { myChampion, otherChampion, tipsType } = req.query;

      if (!tipsType) {
        return res.status(400).json({ message: 'tipsType is required' });
      }

      if (!myChampion) {
        return res.status(400).json({ message: 'myChampion is required' });
      }

      if (!otherChampion) {
        return res.status(400).json({ message: 'otherChampion is required' });
      }

      const language = req.user?.language || DEFAULT_LANGUAGE;
      const model = req.user?.llm;

      const tips = await tipsService.getTips(tipsType as TipsType, myChampion as string, otherChampion as string, model, language);

      if (tips) {
        res.status(200).json(tips);
      } else {
        res.status(404).json({ message: 'No tips found for the given criteria' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TipsController();