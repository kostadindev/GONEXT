

export interface Summoner {
  summonerName: string,
  championName: string,
  championId: number,
  spell1Id: Number,
  spell2Id: Number,
  summonerSpell1Name: string,
  summonerSpell2Name: string,
  teamId: Number,
  puuid: string,
  kills: number,
  assists: number,
  deaths: number,
  summoner1Id: number,
  summoner2Id: number,
  riotId: string,
  championImageId: string
}

export interface Game {
  participants: Summoner[]
  searchedSummoner: Summoner
  gameId: number;
};


export interface Tip {
  title: string,
  description: string
}

export enum TipsType {
  Matchup = 'matchup',
  Synergy = 'synergy'
}


export interface GameHistory {
  win: boolean;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  matchId: string;
  queueName: string;
  participant: Summoner;
  participants: Summoner[];
};