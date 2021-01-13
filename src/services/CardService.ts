import { getRepository } from 'typeorm';
import { Card } from '../entities/Card';
import stripObject from '../helpers/stripObject';

export class CardService {
  private cardRepository = getRepository(Card);

  public async findById(id: string) {
    return this.cardRepository.findOne(id);
  }
  public async existsById(id: string) {
    return (await this.cardRepository.count({ where: { id } })) === 1;
  }
  public async find(where: Card) {
    return this.cardRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: string) {
    return this.cardRepository.delete(id);
  }
  public async update(id: string, card: Card) {
    return this.cardRepository.update(id, card);
  }
  public async create(card: Card) {
    return this.cardRepository.save(card);
  }
}
