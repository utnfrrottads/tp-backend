import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';
import { CardDTO } from './dto/CardDTO';

@Entity()
export class Card {
    static fromDTO(cardDTO: CardDTO): Card {
        const card = new Card();
        card.id = cardDTO.id;
        card.creationDate = cardDTO.creationDate
            ? new Date(cardDTO.creationDate)
            : undefined;
        return card;
    }
    static toDTO(card: Card): CardDTO {
      const { ...dto } = {
        ...card,
        creationDate: card.creationDate?.toISOString(),
      };
      return dto;
    }

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    creationDate?: Date;

    @OneToOne(type => Client, client => client.card)
    client?: Client;
}
