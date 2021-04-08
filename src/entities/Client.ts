import { Exclude, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
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

  @IsNotEmpty()
  @Column()
  name?: string;

  @IsNotEmpty()
  @Column()
  lastName?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @Column()
  birthdate?: Date;

  @IsNotEmpty()
  @Column()
  gender?: 'male' | 'female';

  @IsNotEmpty()
  @Min(0)
  @IsInt()
  @Column()
  points?: number;

  @OneToOne((type) => Card, (card) => card.client)
  @JoinColumn()
  @Type(() => Card)
  card?: Card;

  @OneToMany((type) => RedeemedPrize, (redeemedPrize) => redeemedPrize.client, {
    cascade: ['remove'],
  })
  @Exclude()
  redeemedPrizes?: Promise<RedeemedPrize[]>;

  @OneToMany((type) => Purchase, (purchase) => purchase.client, {
    cascade: ['remove'],
  })
  @Exclude()
  purchases?: Promise<Purchase[]>;
}
