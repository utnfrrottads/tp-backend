import { Exclude, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
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

  @IsNotEmpty()
  @Type(() => Date)
  @Column()
  date?: Date;

  @IsNotEmpty()
  @Min(0)
  @IsInt()
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
