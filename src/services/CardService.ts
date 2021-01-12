import { getRepository } from "typeorm";
import { Card } from "../entities/Card";
import stripObject from "../helpers/stripObject";

export class CardService {
  private cardRepository = getRepository(Card);

  public findById(id: string) {
    return this.cardRepository.findOne(id);
  }
  public find(where: Card) {
    return this.cardRepository.find({ where: stripObject(where) });
  }
  public deleteById(id: string) {
    return this.cardRepository.delete(id);
  }
  public update(id: string, card: Card) {
    return this.cardRepository.update(id, card);
  }
  public create(card: Card) {
    return this.cardRepository.save(card);
  }
}
