import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseItem } from './PurchaseItem';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    price?: number;

    @OneToMany(type => PurchaseItem, purchaseItem => purchaseItem.product)
    purchaseItems?: PurchaseItem[];
}
