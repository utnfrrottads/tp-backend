import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Usuario } from '../models/Usuario';
import { map } from 'rxjs/operators';

const SIGNUP = gql`
  mutation signUp($nombreUsuario: String!, $clave: String!, $nombreApellido: String!, $email: String!, $habilidades: String!) {
    signUp(
      nombreUsuario: $nombreUsuario,
      clave: $clave,
      nombreApellido: $nombreApellido,
      email: $email,
      habilidades: $habilidades
    ){
      user {
        _id
        nombreUsuario
        nombreApellido email
        habilidades
      }
      token
    }
  }
`;

const SIGNIN = gql`
  mutation signIn($nombreUsuario: String!, $clave: String!) {
    signIn(nombreUsuario: $nombreUsuario, clave: $clave){
      user {
        nombreUsuario
        nombreApellido
        email
        habilidades
      }
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) { }

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
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
