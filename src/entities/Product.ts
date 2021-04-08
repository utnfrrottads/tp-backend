import { IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name?: string;

  @IsNotEmpty()
  @Min(0)
  @Column('decimal', { precision: 6, scale: 2 })
  price?: number;
}
