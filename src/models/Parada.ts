import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, Timestamp } from 'typeorm';
import {Recorrido} from './Recorrido';

@Entity()
export class Parada extends BaseEntity{

    @PrimaryGeneratedColumn()
    NroParada;

    @ManyToOne(type => Recorrido, Recorrido => Recorrido.IdRecorrido)
    Recorrido

    @Column({
        type: 'double',        
        nullable: false,        
    })
    latitud: number;
    
    @Column({
        type: 'double',        
        nullable: false,        
    })
    longitud: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,        
    })
    Calle: number;

}