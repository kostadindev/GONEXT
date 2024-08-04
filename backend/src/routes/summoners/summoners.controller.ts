import { Request, Response } from 'express';
import SummonersService from '../../services/summoners.service';

class SummonersController {
  async getSummonerStats(req: Request, res: Response) {
    const { region, puuid } = req.query;

    // Validate that both region and puuid are provided
    if (typeof region !== 'string' || typeof puuid !== 'string') {
      return res.status(400).send('Both region and PUUID must be provided.');
    }

    try {
      const stats = await SummonersService.getSummonerStats(puuid);
      if (stats) {
        res.json(stats);
      } else {
        res.status(404).send('Summoner stats not found.');
      }
    } catch (error) {
      res.status(500).send('An error occurred while fetching summoner stats.');
    }
  }
}

export default new SummonersController();
