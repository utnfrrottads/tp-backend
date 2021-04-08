import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @IsNotEmpty()
  @Min(0)
  @IsInt()
  @Column()
  pointPrice?: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;
}
