import { getRepository } from 'typeorm';
import { Prize } from '../entities/Prize';
import stripObject from '../helpers/stripObject';

export class PrizeService {
  private prizeRepository = getRepository(Prize);

  public findById(id: number) {
    return this.prizeRepository.findOne(id);
  }
  public find(where: Prize) {
    return this.prizeRepository.find({ where: stripObject(where) });
  }
  public deleteById(id: number) {
    return this.prizeRepository.delete(id);
  }
  public update(id: number, prize: Prize) {
    return this.prizeRepository.update(id, prize);
  }
  public create(prize: Prize) {
    return this.prizeRepository.save(prize);
  }
}
