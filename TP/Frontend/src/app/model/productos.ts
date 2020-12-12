import { Rubro } from './rubros';

export class Producto {
    iD: string;
    rubro: Rubro;
    idVendedor: number;
    nombre: string;
    descripcion: string;
    stock: number;
    url: string[];
    cantComprar: number;
    precio: number;
}
