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

  signContract(idServicio: String): any {
    return this.apollo.mutate({
      mutation: SIGN_CONTRACT,
      variables: {
        idServicio
      }
    })
  }

}
