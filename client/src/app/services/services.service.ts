import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const SERVICES = gql`
  query {
    servicios {
      _id
      titulo
      descripcion
      categoria {
        _id
        descripcion
      }
      usuario {
        _id
        nombreUsuario
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
  mutation publishService(
    $titulo: String!
    $descripcion: String!
    $idCategoria: ID!
    $valor: Float!
    $idMoneda: ID!
  ) {
    publishService(
      titulo: $titulo
      descripcion: $descripcion
      idCategoria: $idCategoria
      valor: $valor
      idMoneda: $idMoneda
    ) {
      titulo
      descripcion
      categoria {
        descripcion
      }
      precio {
        valor
        moneda {
          tag
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private apollo: Apollo) {}

  services(): any {
    return this.apollo
      .watchQuery({
        query: SERVICES,
      })
      .valueChanges.pipe(
        map((res: any) => {
          return res.data.servicios;
        })
      );
  }

  publish(service: any): any {
    return this.apollo.mutate({
      mutation: PUBLISH_SERVICE,
      variables: {
        titulo: service.titulo,
        descripcion: service.descripcion,
        idCategoria: service.categoria,
        valor: service.valor,
        idMoneda: service.moneda,
      },
    });
  }
}
