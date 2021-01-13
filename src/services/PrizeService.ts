import { getRepository } from 'typeorm';
import { Prize } from '../entities/Prize';
import stripObject from '../helpers/stripObject';

export class PrizeService {
  private prizeRepository = getRepository(Prize);

  public async findById(id: number) {
    return this.prizeRepository.findOne(id);
  }
  public async existsById(id: number) {
    return (await this.prizeRepository.count({ where: { id } })) === 1;
  }
  public async find(where: Prize) {
    return this.prizeRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: number) {
    return this.prizeRepository.delete(id);
  }
  public async update(id: number, prize: Prize) {
    return this.prizeRepository.update(id, prize);
  }
  public async create(prize: Prize) {
    return this.prizeRepository.save(prize);
  }
}
