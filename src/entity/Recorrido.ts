import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import {LineaColectivo} from './LineaColectivo';
import { Calendario } from './Calendario';
import { Parada } from './Parada';

@Entity()
export class Recorrido extends BaseEntity{

    @PrimaryGeneratedColumn()
    IdRecorrido: number;

    @ManyToOne(type => LineaColectivo, LineaColectivo => LineaColectivo.idLineaColectivo, {nullable: false})
    lineaColectivo: LineaColectivo;

    @Column({
        type: 'varchar',
        length: 50,
        nullable : false
    })
    RecorridoDesde: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    RecorridoHasta: string;

    @OneToMany(type => Calendario, calendario => calendario.recorrido)
    calendario: Calendario[];

    @OneToMany(type => Parada, parada => parada.recorrido)
    parada: Parada[];
}