import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity,         
    ManyToOne,    
    OneToMany} from 'typeorm';
import {Empresa} from './Empresa'
import { Chofer } from './Chofer';
import { Recorrido } from './Recorrido';

@Entity()
export class LineaColectivo extends BaseEntity{

// Si agregamos el parametro 'uuid' hace que los valores seran cadenas de texto,
// de lo contrario es autoincrementable    
@PrimaryGeneratedColumn()
idLineaColectivo: number;

@ManyToOne(type => Empresa, Empresa => Empresa.Cuit, {nullable: false})
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

@OneToMany(type => Chofer, chofer => chofer.lineaColectivo)
chofer: Chofer[];

@OneToMany(type => Recorrido, recorrido => recorrido.lineaColectivo)
recorrido: Chofer[];

}