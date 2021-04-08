import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import { RedeemedPrize } from '../entities/RedeemedPrize';
import stripObject from '../helpers/stripObject';

export class RedeemedPrizeService {
  private redeemedPrizeRepository = getRepository(RedeemedPrize);
  private clientRepository = getRepository(Client);

  public async findByIdAndClientId(id: number, clientId: number) {
    return this.redeemedPrizeRepository.findOne({
      where: { id, client: { id: clientId } },
    });
  }
  public async existsByIdAndClientId(id: number, clientId: number) {
    return (
      (await this.redeemedPrizeRepository.count({
        where: { id, client: { id: clientId } },
      })) === 1
    );
  }
  public async find(where: RedeemedPrize, clientId: number) {
    return this.redeemedPrizeRepository.find({
      where: { ...stripObject(where), client: { id: clientId } },
    });
  }
  public async deleteByIdAndClientId(id: number, clientId: number) {
    return this.redeemedPrizeRepository.delete({
      id,
      client: { id: clientId },
    });
  }
  public async updateByIdAndClientId(id: number, clientId: number, prize: RedeemedPrize) {
    return this.redeemedPrizeRepository.update(
      { id, client: { id: clientId } },
      prize
    );
  }
  public async createByIdAndClientId(redeemedPrize: RedeemedPrize, clientId: number) {
    const client = await this.clientRepository.findOne(clientId);
    redeemedPrize.client = client;
    return this.redeemedPrizeRepository.save(redeemedPrize);
  }
}
