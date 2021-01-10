import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from './Client';
import { Prize } from "./Prize";

@Entity()
export class RedeemedPrize {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    date?: Date;

    @Column()
    usedPoints?: number

    @ManyToOne(type => Client, client => client.card)
    client?: Client;

    @ManyToOne(type => Prize)
    prize?: Prize;
}