import { Servicio } from './Servicio';
import { Usuario } from './Usuario';

export interface Contrato {
  _id?: string;
  fecha?: Date;
  contratoCanceladoPorOferente?: boolean;
  fechaCancelacion?: Date;
  servicio?: Servicio;
  usuario?: Usuario;
}
