import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Servicio } from '../models/Servicio';

const SERVICES = gql`
  query {
    servicios {
      titulo
      descripcion
      categoria {
        _id
        descripcion
      }
      usuario {
        nombreUsuario
        nombreApellido
      }
    }
  }
`;

/* const SERVICE_DETAIL = gql` */
/*   query { */
/*     serviceDetail($serviceId: ID!){ */

/*     } */
/*   } */
/* `; */

const PUBLISH_SERVICE = gql`
  mutation publishService($titulo: String!, $descripcion: String!, $categoria: ID!, $precio: Float!){
    publishService (
      titulo: $titulo,
      descripcion: $descripcion,
      idCategoria: $categoria,
      precio: $precio
    ) {
      titulo
      descripcion
      categoria {
        descripcion
      }
      precio
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private apollo: Apollo) { }

  get(): any {
    return this.apollo.query({
      query: SERVICES
    });
  }

  // getDetail(): any {
  //   this.apollo.query({
  //     query: SERVICE_DETAIL
  //   })
  // }

  /* getDetail(service: Servicio): any { */
  /*   this.apollo.query({ */
  /*     query: SERVICE_DETAIL, */
  /*     variables: { */
  /*       serviceId: service.id */
  /*     } */
  /*   }); */
  /* } */

  publish(service: Servicio): any {
    return this.apollo.mutate({
      mutation: PUBLISH_SERVICE,
      variables: {
        titulo: service.titulo,
        descripcion: service.descripcion,
        categoria: service.categoria,
        precio: service.precio
      }
    });
  }
}
