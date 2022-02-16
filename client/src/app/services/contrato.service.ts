import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CONTRATO = gql`
  query contrato($idContrato: ID!) {
    contrato(idContrato: $idContrato) {
      fecha
      fechaCancelacion
      servicio {
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const SERVICIOS_CONTRATADOS = gql`
  {
    serviciosContratados {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const CONTRATOS_REALIZADOS = gql`
  query contratosRealizados($idServicio: ID!) {
    contratosRealizados(idServicio: $idServicio) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const CONTRATOS_RECIBIDOS = gql`
  query contratosRecibidos($idServicio: ID!) {
    contratosRecibidos(idServicio: $idServicio) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
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

const CANCEL_CONTRACT = gql`
  mutation cancelContract($idContrato: ID!) {
    cancelContract(idContrato: $idContrato) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const CONFIRM_CONTRACT = gql`
  mutation confirmContract($idContrato: ID!) {
    confirmContract(idContrato: $idContrato) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const FINISH_CONTRACT = gql`
  mutation finishContract($idContrato: ID!) {
    finishContract(idContrato: $idContrato) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
    }
  }
`;

const SET_SCORE = gql`
  mutation setScore($idContrato: ID!, $score: Int!) {
    setScore(idContrato: $idContrato, score: $score) {
      _id
      fecha
      contratoCanceladoPorOferente
      fechaCancelacion
      servicio {
        _id
        titulo
        usuario {
          _id
          nombreUsuario
        }
      }
      usuario {
        _id
        nombreUsuario
      }
      estado
      calificacion
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private apollo: Apollo) { }

  contrato(idContrato: String): any {
    return this.apollo.watchQuery({
      query: CONTRATO,
      variables: {
        idContrato
      }
    })
  }

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

  cancelContract(idContrato: String): any {
    return this.apollo.mutate({
      mutation: CANCEL_CONTRACT,
      variables: {
        idContrato
      }
    })
  }

  confirmContract(idContrato: String): any {
    return this.apollo.mutate({
      mutation: CONFIRM_CONTRACT,
      variables: {
        idContrato
      }
    })
  }

  finishContract(idContrato: String): any {
    return this.apollo.mutate({
      mutation: FINISH_CONTRACT,
      variables: {
        idContrato
      }
    })
  }

  setScore(idContrato: String, score: number): any {
    return this.apollo.mutate({
      mutation: SET_SCORE,
      variables: {
        idContrato: idContrato,
        score: score
      }
    })
  }
}
