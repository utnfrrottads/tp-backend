import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, Timestamp } from 'typeorm';
import {Recorrido} from './Recorrido';

@Entity()
export class Parada extends BaseEntity{

    @PrimaryGeneratedColumn()
    NroParada: number;

    @ManyToOne(type => Recorrido, recorrido => recorrido.IdRecorrido, {nullable: false})
    recorrido: Recorrido;

    @Column({
        type: 'double',        
        nullable: false,        
    })
    Latitud: number;
    
    @Column({
        type: 'double',        
        nullable: false,        
    })
    Longitud: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,        
    })
    Calle: number;

}