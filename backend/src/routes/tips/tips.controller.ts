import tipsService from "../../services/tips.service";

export class TipsController {
  async getTips(req, res) {
    const { myChampion, otherChampion, tipsType } = req.query;
    console.log(myChampion, otherChampion, tipsType);
    const tips = await tipsService.getTips(tipsType, myChampion, otherChampion);
    res.json(tips);
  }
}

export default new TipsController();