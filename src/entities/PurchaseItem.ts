import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { Purchase } from './Purchase';

@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  @Column()
  quantity?: number;

  @Exclude()
  @ManyToOne((type) => Purchase, (purchase) => purchase.purchaseItems)
  purchase?: Purchase;

  @ManyToOne((type) => Product, { eager: true })
  product?: Product;
}
