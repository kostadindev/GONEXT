import tipsService from "../../services/tips.service";

export class TipsController {
  async getTips(req, res) {
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

      const tips = await tipsService.getTips(tipsType, myChampion, otherChampion);

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