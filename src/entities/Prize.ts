import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RedeemedPrize } from './RedeemedPrize';

@Entity()
export class Prize {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    pointPrice?: number;

    @OneToMany(type => RedeemedPrize, redeemedPrize => redeemedPrize.prize)
    redeemedPrizes?: RedeemedPrize;
}