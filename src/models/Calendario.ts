import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, Timestamp } from 'typeorm';
import {Chofer} from './Chofer';
import {Recorrido} from './Recorrido';

@Entity()
export class Calendario extends BaseEntity{

    @PrimaryGeneratedColumn()
    IdCalendario: number;

    @ManyToOne(type => Recorrido, Recorrido => Recorrido.IdRecorrido)    
    Recorrido;

    @ManyToOne(type => Chofer, Chofer => Chofer.Cuil)    
    Chofer;

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