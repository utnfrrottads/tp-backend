import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import { Purchase } from '../entities/Purchase';
import stripObject from '../helpers/stripObject';

export class PurchaseService {
  private purchaseRepository = getRepository(Purchase);
  private clientRepository = getRepository(Client);

  public async findByIdAndClientId(id: number, clientId: number) {
    return this.purchaseRepository.findOne({
      where: { id, client: { id: clientId } },
    });
  }
  public async existsByIdAndClientId(id: number, clientId: number) {
    return (
      (await this.purchaseRepository.count({
        where: { id, client: { id: clientId } },
      })) === 1
    );
  }
  public async find(where: Purchase, clientId: number) {
    return this.purchaseRepository.find({
      where: { ...stripObject(where), client: { id: clientId } },
    });
  }
  public async deleteByIdAndClientId(id: number, clientId: number) {
    return this.purchaseRepository.delete({
      id,
      client: { id: clientId },
    });
  }
  public async updateByIdAndClientId(id: number, clientId: number, purchase: Purchase) {
    return this.purchaseRepository.update(
      { id, client: { id: clientId } },
      purchase
    );
  }
  public async createByIdAndClientId(purchase: Purchase, clientId: number) {
    const client = await this.clientRepository.findOne(clientId);
    purchase.client = client;
    return this.purchaseRepository.save(purchase);
  }
}
