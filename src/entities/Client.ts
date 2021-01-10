import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
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

    @Column()
    birthdate?: Date;

    @Column()
    gender?: string;

    @Column()
    points?: number;

    @OneToOne(type => Card, card => card.client)
    card?: Card;

    @OneToMany(type => RedeemedPrize, redeemedPrize => redeemedPrize.client)
    redemedPrizes?: RedeemedPrize[];

    @OneToMany(type => Purchase, purchase => purchase.client)
    purchases?: Purchase[];
}
