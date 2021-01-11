import { Exclude, Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './Card';
import { Purchase } from './Purchase';
import { RedeemedPrize } from './RedeemedPrize';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  lastName?: string;

  @Type(() => Date)
  @Column()
  birthdate?: Date;

  @Column()
  gender?: 'male' | 'female';

  @Column()
  points?: number;

  @OneToOne((type) => Card, (card) => card.client)
  @JoinColumn()
  @Type(() => Card)
  card?: Card;

  @OneToMany((type) => RedeemedPrize, (redeemedPrize) => redeemedPrize.client)
  @Exclude()
  redeemedPrizes?: Promise<RedeemedPrize[]>;

  @OneToMany((type) => Purchase, (purchase) => purchase.client)
  @Exclude()
  purchases?: Promise<Purchase[]>;
}
