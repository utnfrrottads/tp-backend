import { Exclude, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';
import { Prize } from './Prize';

@Entity()
export class RedeemedPrize {
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

  @Column()
  delivered?: boolean;

  @Exclude()
  @ManyToOne((type) => Client, (client) => client.card)
  client?: Client;

  @Exclude()
  @ManyToOne((type) => Prize, { eager: true })
  prize?: Prize;
}
