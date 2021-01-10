import { Exclude, Type } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Prize } from "./Prize";

@Entity()
export class RedeemedPrize {
  @PrimaryGeneratedColumn()
  id?: number;

  @Type(() => Date)
  @Column()
  date?: Date;

  @Column()
  usedPoints?: number;

  @Exclude()
  @ManyToOne((type) => Client, (client) => client.card)
  client?: Promise<Client>;

  @Exclude()
  @ManyToOne((type) => Prize, { eager: true })
  prize?: Prize;
}
