import { Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Card {
    @PrimaryColumn()
    id?: string;

    @Type(() => Date)
    @CreateDateColumn()
    creationDate?: Date;

  @OneToOne((type) => Client, (client) => client.card)
  client?: Promise<Client>;
}
