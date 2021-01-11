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

  @Column()
  dateFilterMin?: Date;

  @Column()
  dateFilterMax?: Date;

  @Column()
  genderFilter?: 'male' | 'female';
}
