import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const MENSAJES_DEL_CONTRATO = gql`
  query mensajesDelContrato($idContrato: ID!) {
    mensajesDelContrato(idContrato: $idContrato) {
      _id
      mensaje
      mensajeEnviadoPorOferente
      fechaHoraEnvio
      contrato {
        _id
        servicio {
          _id
          usuario {
            _id
            nombreUsuario
          }
        }
        usuario {
          _id
          nombreUsuario
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private apollo: Apollo) { }

  mensajesDelContrato(idContrato: String): any {
    return this.apollo.watchQuery({
      query: MENSAJES_DEL_CONTRATO,
      fetchPolicy: 'no-cache',
      pollInterval: 10000,
      variables: {
        idContrato
      }
    })
  }

}
