import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity,         
         ManyToOne} from 'typeorm';
import {Empresa} from './Empresa'

@Entity()
export class LineaColectivo extends BaseEntity{

    // Si agregamos el parametro 'uuid' hace que los valores seran cadenas de texto,
    // de lo contrario es autoincrementable    
    @PrimaryGeneratedColumn()
    idLineaColectivo: number;

    @ManyToOne(type => Empresa, Empresa => Empresa.Cuit)
    empresa: Empresa;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    nombre: string;

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

}