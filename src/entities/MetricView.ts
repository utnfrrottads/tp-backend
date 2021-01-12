import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MetricView {
  @PrimaryGeneratedColumn()
  id?: number;

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
