import { ClientSupplier } from "../client-supplier/client-supplier";

export class Suppliers {

    id_proveedor: number;
    cuit: string;
    razon_social: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    proveedores_articulos: ClientSupplier;
}
