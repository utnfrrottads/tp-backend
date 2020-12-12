import { Rubro } from './rubros';

export class Producto {
  // No se cambió el nombre de la variable para pasar el ng-lint porque no se utilizó en
  // muchos lugares y habría que hacer un refactor completo.
  _id: string;
  rubro: Rubro;
  idVendedor: number;
  nombre: string;
  descripcion: string;
  stock: number;
  url: string[];
  cantComprar: number;
  precio: number;
}
