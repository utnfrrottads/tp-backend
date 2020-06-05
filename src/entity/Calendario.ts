import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, Timestamp } from 'typeorm';
import {Chofer} from './Chofer';
import {Recorrido} from './Recorrido';

@Entity()
export class Calendario extends BaseEntity{

    @PrimaryGeneratedColumn()
    IdCalendario: number;

    @ManyToOne(type => Recorrido, recorrido => recorrido.IdRecorrido)    
    recorrido: Recorrido;

    @ManyToOne(type => Chofer, chofer => chofer.Cuil)
    chofer: Chofer;

    @Column({
        type : 'time',
        default: null
    })
    HoraLlegada: Timestamp;

    @Column({
        type: 'time',
        default: null
    })
    HoraSalida: Timestamp;
}