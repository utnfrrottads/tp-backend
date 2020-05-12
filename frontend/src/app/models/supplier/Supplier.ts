import { ClientSupplier } from "../client-supplier/client-supplier";

export class Supplier {

    id_proveedor: number;
    cuit: string;
    razon_social: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    proveedores_articulos: ClientSupplier;

    setProvArt(provArt: ClientSupplier){
        this.proveedores_articulos = provArt;
    }

}
