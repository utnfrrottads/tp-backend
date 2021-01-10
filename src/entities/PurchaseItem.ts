import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Purchase } from "./Purchase";

@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  quantity?: number;

  @ManyToOne((type) => Purchase, (purchase) => purchase.purchaseItems)
  purchase?: Promise<Purchase>;

  @ManyToOne((type) => Product, { eager: true })
  product?: Product;
}
