import { Type } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id?: number;

    @Type(() => Date)
    @Column()
    creationDate?: Date;

    @OneToOne(type => Client, client => client.card)
    client?: Promise<Client>;
}
