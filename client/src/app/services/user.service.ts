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
    ) {
      usuario {
        _id
        nombreUsuario
        nombreApellido
        email
        habilidades
        fotoPerfil
        isAdministrador
      }
      token
    }
  }
`;

const CAMBIARCLAVE = gql`
  mutation cambiarClave($claveActual: String!, $claveNueva: String!) {
    cambiarClave(claveActual: $claveActual, claveNueva: $claveNueva) {
      usuario {
        _id
        nombreUsuario
        nombreApellido
        email
        habilidades
        fotoPerfil
        isAdministrador
      }
      token
    }
  }
`;

const UPDATEPROFILEIMAGE = gql`
  mutation updateProfileImage($fotoPerfil: String!) {
    updateProfileImage(fotoPerfil: $fotoPerfil) {
      _id
      nombreUsuario
      nombreApellido
      email
      habilidades
      fotoPerfil
      isAdministrador
    }
  }
`;

const DELETEPROFILEIMAGE = gql`
  mutation deleteProfileImage {
    deleteProfileImage {
      _id
      nombreUsuario
      nombreApellido
      email
      habilidades
      fotoPerfil
      isAdministrador
    }
  }
`;

const DELETEACCOUNT = gql`
  mutation deleteAccount($_id: String!) {
    deleteAccount(_id: $_id) {
      _id
    }
  }
`;

const USUARIO = gql`
  query usuario($nombreUsuario: String!) {
    usuario(nombreUsuario: $nombreUsuario) {
      _id
      nombreUsuario
      nombreApellido
      email
      habilidades
      fotoPerfil
      isAdministrador
      nivel {
        nro
        contratosMinimos
      }
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

  updateProfileImage(usuario: Usuario): any {
    return this.apollo.mutate({
      mutation: UPDATEPROFILEIMAGE,
      variables: {
        fotoPerfil: usuario.fotoPerfil
      }
    })
  }

  deleteProfileImage(): any {
    return this.apollo.mutate({
      mutation: DELETEPROFILEIMAGE
    })
  }

  usuario(nombreUsuario: String): any {
    return this.apollo.watchQuery({
      query: USUARIO,
      variables: {
        nombreUsuario
      }
    })
  }

  deleteAccount(usuario: Usuario): any {
    return this.apollo.mutate({
      mutation: DELETEACCOUNT,
      variables: {
        _id: usuario._id
      }
    })
  }
}
