import { Request, Response } from 'express';
import leagueService from '../../services/league.service';
import { Platform, PLATFORM_TO_REGION, Region } from '../../repositories/league/league.repository';

class SummonersController {
  async getSummonerStats(req: Request, res: Response) {
    const { region, puuid } = req.query;

    if (typeof region !== 'string' || typeof puuid !== 'string') {
      return res.status(400).json({ error: 'Both region and PUUID must be provided and should be strings.' });
    }

    try {
      const stats = await leagueService.getSummonerStats(puuid, region as Platform);
      if (stats) {
        res.json(stats);
      } else {
        res.status(404).json({ error: 'Summoner stats not found.' });
      }
    } catch (error) {
      console.error('Error fetching summoner stats:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching summoner stats.' });
    }
  }

  async getSummonerByRiotId(req: Request, res: Response) {
    const { gameName, tagLine, region } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string' || typeof region !== 'string') {
      return res.status(400).json({ error: 'gameName, tagLine, and region must be provided and should be strings.' });
    }

    try {
      const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine, PLATFORM_TO_REGION[region as Platform]);
      if (summoner) {
        res.json(summoner);
      } else {
        res.status(404).json({ error: 'Summoner not found.' });
      }
    } catch (error) {
      console.error('Error fetching summoner by Riot ID:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the summoner.' });
    }
  }

  async getActiveGame(req: Request, res: Response) {
    const { gameName, tagLine, region } = req.query;

    if (typeof gameName !== 'string' || typeof tagLine !== 'string' || typeof region !== 'string') {
      return res.status(400).json({ error: 'gameName, tagLine, and region must be provided and should be strings.' });
    }

    try {
      const summoner = await leagueService.getSummonerByRiotId(gameName, tagLine, PLATFORM_TO_REGION[region as Platform]);

      if (!summoner || !summoner.puuid) {
        return res.status(404).json({ error: 'Summoner not found or missing PUUID.' });
      }

      const game = await leagueService.getActiveGameByPuuid(summoner.puuid, region as Platform);

      if (game) {
        res.json(game);
      } else {
        res.status(204).json({ message: 'No active game found.' });
      }
    } catch (error) {
      console.error('Error fetching active game:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the active game.' });
    }
  }

  async getFeaturedSummoner(req: Request, res: Response) {
    const { region } = req.query;
    const platform = (typeof region === 'string' ? region : 'NA1') as Platform;
    try {
      const featuredSummoner = await leagueService.getFeaturedSummoner(platform);
      if (featuredSummoner) {
        res.json(featuredSummoner);
      } else {
        res.status(404).json({ error: 'Featured summoner not found.' });
      }
    } catch (error) {
      console.error('Error fetching featured summoner:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching the featured summoner.' });
    }
  }
}

export default new SummonersController();
