import { Usuario } from './Usuario';

export interface Notificacion {
  _id?: string;
  descripcion?: string;
  link?: string,
  fechaHora?: Date;
  leida?: boolean;
  abierta?: boolean;
  icono?: string;
  usuario?: Usuario;
}
