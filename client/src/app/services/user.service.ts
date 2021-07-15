import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Usuario } from '../models/Usuario';

const UPDATEUSUARIO = gql`
  mutation updateUsuario($nombreUsuario: String!, $clave: String!, $nombreApellido: String!, $email: String!, $habilidades: String!) {
    updateUsuario(
      nombreUsuario: $nombreUsuario,
      clave: $clave,
      nombreApellido: $nombreApellido,
      email: $email,
      habilidades: $habilidades
    ){
      usuario {
        _id
        nombreUsuario
        nombreApellido
        email
        habilidades
        isAdministrador
      }
      token
    }
  }
`;

const CAMBIARCLAVE = gql`
  mutation cambiarClave($claveActual: String!, $claveNueva: String!) {
    cambiarClave(
      claveActual: $claveActual,
      claveNueva: $claveNueva
    ){
      usuario {
        _id
        nombreUsuario
        nombreApellido 
        email
        habilidades
        isAdministrador
      }
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  updateUsuario(usuario: Usuario, clave: String): any {
    return this.apollo.mutate({
      mutation: UPDATEUSUARIO,
      variables: {
        nombreUsuario: usuario.nombreUsuario,
        clave: clave,
        nombreApellido: usuario.nombreApellido,
        email: usuario.email,
        habilidades: usuario.habilidades
      }
    })
  }

  cambiarClave(claveActual: String, claveNueva: String): any {
    return this.apollo.mutate({
      mutation: CAMBIARCLAVE,
      variables: {
        claveActual,
        claveNueva
      }
    })
  }

  /* deleteUsuario(): void {} */

}
