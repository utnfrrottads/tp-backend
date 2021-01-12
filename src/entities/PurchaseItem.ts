import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { Purchase } from './Purchase';

@Entity()
export class PurchaseItem {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    quantity?: number;

    @Exclude()
    @ManyToOne(type => Purchase, purchase => purchase.purchaseItems)
    purchase?: Promise<Purchase>;

    @Exclude()
    @ManyToOne(type => Product, { eager: true })
    product?: Product;
}
