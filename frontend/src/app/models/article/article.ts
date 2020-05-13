import { Supplier } from "../supplier/Supplier";

export class Article {
    
    id_articulo: number;
    descripcion: string;
    precio: number;
    stock: number;
    proveedores: Supplier[] = [];

    setSupplier(proveedor: Supplier){
        this.proveedores.push(proveedor);
    }
}
