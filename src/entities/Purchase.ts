import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Client } from './Client';
import { PurchaseItem } from './PurchaseItem';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    date?: Date;

    @Column()
    usedPoints?: number;

    @ManyToOne(type => Client, client => client.purchases)
    client?: Client;

    @OneToMany(type => PurchaseItem, purchaseItem => purchaseItem.purchase)
    purchaseItems?: PurchaseItem[];
}
