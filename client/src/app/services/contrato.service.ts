import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const SERVICIOS_CONTRATADOS = gql`
  {
    serviciosContratados {
      _id
      fecha
      fechaCancelacion
      servicio {
        _id
        titulo
      }
      usuario {
        _id
        nombreUsuario
      }
    }
  }
`;

const CONTRATOS_REALIZADOS = gql`
  query contratosRealizados($idServicio: ID!) {
    contratosRealizados(idServicio: $idServicio) {
      _id
      fecha
      fechaCancelacion
    }
  }
`;

const CONTRATOS_RECIBIDOS = gql`
  query contratosRecibidos($idServicio: ID!) {
    contratosRecibidos(idServicio: $idServicio) {
      _id
      fecha
      fechaCancelacion
    }
  }
`;

const SIGN_CONTRACT = gql`
  mutation signContract($idServicio: ID!) {
    signContract(idServicio: $idServicio) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private apollo: Apollo) { }

  serviciosContratados(): any {
    return this.apollo.watchQuery({
      query: SERVICIOS_CONTRATADOS
    })
  }

  contratosRealizados(idServicio: String): any {
    return this.apollo.watchQuery({
      query: CONTRATOS_REALIZADOS,
      variables: {
        idServicio
      }
    })
  }

  contratosRecibidos(idServicio: String): any {
    return this.apollo.watchQuery({
      query: CONTRATOS_RECIBIDOS,
      variables: {
        idServicio
      }
    })
  }

  signContract(idServicio: String): any {
    return this.apollo.mutate({
      mutation: SIGN_CONTRACT,
      variables: {
        idServicio
      }
    })
  }

}
