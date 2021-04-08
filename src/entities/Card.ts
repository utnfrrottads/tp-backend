import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @Column()
  creationDate?: Date;

  @OneToOne((type) => Client, (client) => client.card)
  client?: Promise<Client>;
}
