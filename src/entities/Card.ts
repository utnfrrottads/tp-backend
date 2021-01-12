import { Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Card {
<<<<<<< HEAD
    @PrimaryColumn()
    id?: string;

    @Type(() => Date)
    @CreateDateColumn()
    creationDate?: Date;
=======
  @PrimaryGeneratedColumn()
  id?: number;

  @Type(() => Date)
  @Column()
  creationDate?: Date;
>>>>>>> 9bad0504bcd1517408db3b4db64e4af5af01137a

  @OneToOne((type) => Client, (client) => client.card)
  client?: Promise<Client>;
}
