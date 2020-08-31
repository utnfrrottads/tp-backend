import { Rubro } from './rubros';

export class Producto {
    idProducto: string;
    rubro: Rubro;
    idVendedor: number;
    nombre: string;
    descripcion: string;
    stock: number;
    url : string[];
    cantComprar : number;
    precio: number;
}