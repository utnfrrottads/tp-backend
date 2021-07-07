import { ArticleSupplier } from "../article-supplier/article-supplier";

export class Supplier {
    id_proveedor: number;
    cuit: string;
    razon_social: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    proveedores_articulos: ArticleSupplier;
}
