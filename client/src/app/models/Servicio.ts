import { Usuario } from './Usuario';
import { Categoria } from './Categoria';
import { Precio } from './Precio';

export interface Servicio {
  _id?: string;
  titulo?: string;
  descripcion?: string;
  categoria?: Categoria;
  usuario?: Usuario;
  precio?: Precio;
  fechaHoraPublicacion?: Date,
}
