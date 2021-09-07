import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Usuario } from '../models/Usuario';

declare var $: any;

const SIGNUP = gql`
  mutation signUp($nombreUsuario: String!, $clave: String!, $nombreApellido: String!, $email: String!, $habilidades: String!) {
    signUp(
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
        fotoPerfil
        isAdministrador
      }
      token
    }
  }
`;

const SIGNIN = gql`
  mutation signIn($nombreUsuario: String!, $clave: String!) {
    signIn(nombreUsuario: $nombreUsuario, clave: $clave) {
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


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo, private router: Router) { }

  signUp(usuario: Usuario): any {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        nombreUsuario: usuario.nombreUsuario,
        clave: usuario.clave,
        nombreApellido: usuario.nombreApellido,
        email: usuario.email,
        habilidades: usuario.habilidades
      }
    });
  }

  signIn(usuario: Usuario): any {
    return this.apollo.mutate({
      mutation: SIGNIN,
      variables: {
        nombreUsuario: usuario.nombreUsuario,
        clave: usuario.clave
      }
    });
  }

  loggedIn(): boolean {
    if (localStorage.getItem('usuario') && localStorage.getItem('nombreUsuario') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (localStorage.getItem('usuario') && localStorage.getItem('nombreUsuario') && localStorage.getItem('token')) {
      if (JSON.parse(localStorage.getItem('usuario') || '{}').isAdministrador) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');

    $(".navbar-collapse").removeClass("show");

    this.router.navigate(['/']);
  }

}
