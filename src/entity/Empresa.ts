import { Entity, Column, BaseEntity, PrimaryColumn} from 'typeorm';

@Entity()
export class Empresa extends BaseEntity {

@PrimaryColumn({type: "bigint",
               unique: true,
               nullable: false})
Cuit: number;

@Column({
   type: "varchar",
   length: 200,
   unique: true,
   nullable: false
})
RazonSocial: string;

@Column({
   type: "varchar",
   length: 100, 
   nullable: false
})
Provincia: string;

@Column({
   type: "varchar",
   length: 100,        
   nullable: false
})
Localidad: string;

@Column({
   type: "varchar",
   length: 100,        
   nullable: false
})
Domicilio: string;

@Column({
   type: "varchar",
   length: 100,        
   nullable: false
})
Telefono: string;

@Column({
   type: "varchar",
   length: 100,        
   nullable: false
})
Email: string;

}