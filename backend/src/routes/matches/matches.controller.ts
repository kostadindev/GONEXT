import { Request, Response } from 'express';
import { LeagueService } from '../../services/league.service';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const filePath = path.join(__dirname, '..', '..', '..', 'mocks', 'active_game.json');
const leagueService = new LeagueService();

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
    return res.status(400).send('Both region and PUUID must be provided.');
  }

  try {
    const matchIds = await leagueService.getMatchesIds(puuid) || [];
    const matches = await Promise.all(matchIds.map(async (matchId) => {
      const match = await leagueService.getMatchById(matchId);
      const participants = leagueService.getParticipantsFromMatch(match);
      let participant = match?.info?.participants.find(p => p?.puuid === puuid);

      if (participant) {
        participant = {
          ...participant,
          summonerSpell1Name: leagueService.getSummonerSpellName(participant.summoner1Id?.toString()),
          summonerSpell2Name: leagueService.getSummonerSpellName(participant.summoner2Id?.toString())
        } as any;
      }

      return {
        win: participant?.win,
        gameCreation: match?.info?.gameCreation,
        gameDuration: match?.info?.gameDuration,
        gameMode: match?.info?.gameMode,
        matchId: match?.metadata?.matchId,
        queueName: match?.info?.queueName,
        participant,
        participants
      };
    }));

    res.json(matches);
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).send('Unknown error');
  }
}

export { getActiveMatch, getMatchHistory };
