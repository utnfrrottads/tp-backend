import { Servicio } from './Servicio';
import { Usuario } from './Usuario';

export interface Contrato {
  _id?: string;
  fecha?: Date;
  fechaCancelacion?: Date;
  servicio?: Servicio;
  usuario?: Usuario;
}
