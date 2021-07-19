import { Usuario } from './Usuario';
import { Categoria } from './Categoria';

export class Servicio {
  id?: string;
  titulo?: string;
  descripcion?: string;
  categoria?: Categoria;
  usuario?: Usuario;
  precio?: number;

  public constructor(init?: Partial<Servicio>) {
      Object.assign(this, init);
  }
}
