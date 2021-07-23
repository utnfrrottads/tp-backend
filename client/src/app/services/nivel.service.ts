import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Nivel } from '../models/Nivel';

const NIVELES = gql`
  {
    niveles {
      _id
      nro
      contratosMinimos
    }
  }
`;

const ADDNIVEL = gql`
  mutation addNivel($nro: Int!, $contratosMinimos: Int!) {
    addNivel(nro: $nro, contratosMinimos: $contratosMinimos) {
      _id
      nro
      contratosMinimos
    }
  }
`;

const DELETENIVEL = gql`
  mutation deleteNivel($_id: String!) {
    deleteNivel(_id: $_id) {
      _id
      nro
      contratosMinimos
    }
  }
`;

const UPDATENIVEL = gql`
  mutation updateNivel($_id: String!, $nro: Int!, $contratosMinimos: Int!) {
    updateNivel(_id: $_id, nro: $nro, contratosMinimos: $contratosMinimos) {
      _id
      nro
      contratosMinimos
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private apollo: Apollo) { }

  niveles(): any {
    return this.apollo.watchQuery({
      query: NIVELES
    })
  }

  addNivel(nivel: Nivel): any {
    return this.apollo.mutate({
      mutation: ADDNIVEL,
      variables: {
        nro: nivel.nro,
        contratosMinimos: nivel.contratosMinimos
      }
    })
  }

  deleteNivel(_id: String): any {
    return this.apollo.mutate({
      mutation: DELETENIVEL,
      variables: {
        _id
      }
    })
  }

  updateNivel(nivel: Nivel): any {
    return this.apollo.mutate({
      mutation: UPDATENIVEL,
      variables: {
        _id: nivel._id,
        nro: nivel.nro,
        contratosMinimos: nivel.contratosMinimos
      }
    })
  }

}
