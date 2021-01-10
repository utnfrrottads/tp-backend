import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    creationDate?: Date;

    @OneToOne(type => Client, client => client.card)
    client?: Promise<Client>;
}
