import summonersRepository from "../repositories/summoners/summoners.repository";

class SummonersService {
  async getSummonerStats(puuid: string): Promise<any> {
    return summonersRepository.getSummonerStats(puuid);
  }
}

export default new SummonersService();
