import { Suppliers } from "../supplier/Suppliers";

export class Article {

    id_articulo: number;
    descripcion: string;
    precio: number;
    stock: number;
    Supplier: Suppliers[];
}
