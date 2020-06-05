import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne } from 'typeorm';
import {LineaColectivo} from './LineaColectivo';

@Entity()
export class Recorrido extends BaseEntity{

    @PrimaryGeneratedColumn()
    IdRecorrido: number;

    @ManyToOne(type => LineaColectivo, LineaColectivo => LineaColectivo.idLineaColectivo)
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
}