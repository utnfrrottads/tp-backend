import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Usuario } from '../models/Usuario';

const UPDATE = gql`
  mutation updateUsuario($nombreUsuario: String!, $nombreApellido: String!, $email: String!, $habilidades: String!) {
    updateUsuario(
      nombreUsuario: $nombreUsuario,
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

  update(usuario: Usuario): any {
    return this.apollo.mutate({
      mutation: UPDATE,
      variables: {
        nombreUsuario: usuario.nombreUsuario,
        nombreApellido: usuario.nombreApellido,
        email: usuario.email,
        habilidades: usuario.habilidades
      }
    });
  }

  /* delete(): void {} */

}
