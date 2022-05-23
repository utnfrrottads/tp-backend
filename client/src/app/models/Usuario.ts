import { Nivel } from "./Nivel";

export interface Usuario {
    _id?: string;
    nombreUsuario?: string;
    clave?: string;
    nombreApellido?: string;
    email?: string;
    habilidades?: string;
    fotoPerfil?: string;
    imagen?: any;
    isAdministrador?: boolean;
    nivel?: Nivel;
}
