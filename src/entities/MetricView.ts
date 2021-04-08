import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MetricView {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @IsNotEmpty()
  @Column()
  name?: string;

  @Column()
  ageFilterMin?: number;

  @Column()
  ageFilterMax?: number;

  @Type(() => Date)
  @Column()
  dateFilterMin?: Date;

  @Type(() => Date)
  @Column()
  dateFilterMax?: Date;

  @Column()
  genderFilter?: 'male' | 'female';
}
