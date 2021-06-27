import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Usuario } from "../models/Usuario";
import { map } from 'rxjs/operators';

const SIGNUP = gql`
  mutation signUp($nombreUsuario: String!, $clave: String!, $nombreApellido: String!, $email: String!, $habilidades: String!) {
    signUp(nombreUsuario: $nombreUsuario, clave: $clave, nombreApellido: $nombreApellido, email: $email, habilidades: $habilidades)
  }
`;

const SIGNIN = gql`
  mutation signIn($nombreUsuario: String!, $clave: String!) {
    signIn(nombreUsuario: $nombreUsuario, clave: $clave)
  }
`;

const PERFIL = gql`
  {
    perfil {
      _id
      nombreUsuario
      clave
      email
      habilidades
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

  profile(): any {
    return this.apollo.watchQuery({
      query: PERFIL
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.perfil;
      })
    );
  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/signin']);
  }

}