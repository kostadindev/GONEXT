

export interface Summoner {
  summonerName: string,
  championName: string,
  championId: Number,
  spell1Id: Number,
  spell2Id: Number,
  summonerSpell1Name: string,
  summonerSpell2Name: string,
  teamId: Number,
  puuid: string
}

export interface Game {
  participants: Summoner[]
  searchedSummoner: Summoner
};

export interface Tips {
  label: string
  text: string
}

export interface Tip {
  label: string,
  text: string
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
  participants: Summoner[];
};