import { getRepository } from 'typeorm';
import { Purchase } from '../entities/Purchase';
import stripObject from '../helpers/stripObject';

export class PurchaseService {
  private purchaseRepository = getRepository(Purchase);

  public async findById(id: number) {
    return this.purchaseRepository.findOne(id);
  }
  public async existsById(id: number) {
    return (await this.purchaseRepository.count({ where: { id } })) === 1;
  }
  public async find(where: Purchase) {
    return this.purchaseRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: number) {
    return this.purchaseRepository.delete(id);
  }
  public async update(id: number, purchase: Purchase) {
    return this.purchaseRepository.update(id, purchase);
  }
  public async create(purchase: Purchase) {
    return this.purchaseRepository.save(purchase);
  }
}
