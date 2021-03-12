import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  pointPrice?: number;

  @Column({nullable:true})
  description?: string;

  @Column({nullable:true})
  image?: string;
}
