import { Contrato } from './Contrato';

export interface Mensaje {
  _id?: string;
  mensaje?: string;
  mensajeEnviadoPorOferente?: boolean;
  fechaHoraEnvio?: Date;
  contrato?: Contrato;
}
