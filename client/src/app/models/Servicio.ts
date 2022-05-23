import { Usuario } from './Usuario';
import { Categoria } from './Categoria';
import { Precio } from './Precio';

export interface Servicio {
  _id?: string;
  titulo?: string;
  descripcion?: string;
  precio?: Precio;
  ubicacion?: string,
  fechaHoraPublicacion?: Date,
  categoria?: Categoria;
  usuario?: Usuario;
}
