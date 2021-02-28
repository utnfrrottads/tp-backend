import { Exclude, Type } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';
import { PurchaseItem } from './PurchaseItem';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id?: number;

  @Type(() => Date)
  @Column()
  date?: Date;

  @Column()
  usedPoints?: number;

  @ManyToOne((type) => Client, (client) => client.purchases)
  @Exclude()
  client?: Client;

  @OneToMany((type) => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    cascade: ['remove'],
  })
  @Exclude()
  purchaseItems?: Promise<PurchaseItem[]>;
}
