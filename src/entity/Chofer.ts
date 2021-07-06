import { Entity, PrimaryColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import {LineaColectivo} from './LineaColectivo';
import { Calendario } from './Calendario';

@Entity()
export class Chofer extends BaseEntity {

    @PrimaryColumn({type: "bigint",
                    unique: true,
                    nullable: false})
    Cuil: number;
    
    @ManyToOne(type => LineaColectivo, LineaColectivo => LineaColectivo.idLineaColectivo, {nullable: false})
    lineaColectivo: LineaColectivo;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: false
    })
    Nombre: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    Apellido: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    Telefono: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    Email: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    Provincia: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    Localidad: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    Domicilio: string;

    @OneToMany(type => Calendario, calendario => calendario.chofer, {nullable: true})
    calendario: Calendario[];

}