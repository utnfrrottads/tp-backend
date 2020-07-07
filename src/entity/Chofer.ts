import { Entity, PrimaryColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import {LineaColectivo} from './LineaColectivo';
import { Calendario } from './Calendario';

@Entity()
export class Chofer extends BaseEntity {

    @PrimaryColumn({type: "decimal",
                    unique: true,
                    nullable: false})
    Cuil: number;
    
    @ManyToOne(type => LineaColectivo, LineaColectivo => LineaColectivo.idLineaColectivo, {nullable: false})
    lineaColectivo: LineaColectivo;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
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
        unique: true
    })
    Provincia: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    Localidad: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    Domicilio: string;

    @OneToMany(type => Calendario, calendario => calendario.chofer)
    calendario: Calendario[];

}