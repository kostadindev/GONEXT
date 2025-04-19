import { Request, Response } from 'express';
import leagueService from '../../services/league.service';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { Platform } from '../../repositories/league/league.repository';

dotenv.config();

const filePath = path.join(__dirname, '..', '..', '..', 'mocks', 'active_game.json');

function getActiveMatch(req: Request, res: Response): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading the file');
    }

    try {
      const activeMatch = leagueService.getEnrichedGame(JSON.parse(data));
      res.json(activeMatch);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON data');
    }
  });
}

async function getMatchHistory(req: Request, res: Response) {
  const { region, puuid } = req.query;

  if (typeof region !== 'string' || typeof puuid !== 'string') {
    return res.status(400).json({ error: 'Both region and PUUID must be provided and should be strings.' });
  }

  try {
    const matches = await leagueService.getMatches(puuid, 7, region as Platform);
    if (matches) {
      res.json(matches);
    } else {
      res.status(404).json({ error: 'Match history not found.' });
    }
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'An internal server error occurred while fetching match history.' });
  }
}

async function getActiveGame(req: Request, res: Response) {
  const { region, puuid } = req.query;

  if (typeof region !== 'string' || typeof puuid !== 'string') {
    return res.status(400).json({ error: 'Both region and PUUID must be provided and should be strings.' });
  }

  try {
    const game = await leagueService.getActiveGameByPuuid(puuid, region as Platform);
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

export { getActiveMatch, getMatchHistory, getActiveGame };
