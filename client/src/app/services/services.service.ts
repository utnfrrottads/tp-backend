import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Categoria } from 'src/app/models/Categoria';

const SERVICIOS = gql`
  query {
    servicios {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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

const SERVICES_POR_BUSQUEDA = gql`
  query serviciosPorBusqueda($busqueda: String!) {
    serviciosPorBusqueda(busqueda: $busqueda) {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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

const SERVICES_POR_CATEGORIAS = gql`
  query serviciosPorCategorias($categorias: InputIDCategoriasSeleccionadas!) {
    serviciosPorCategorias(categorias: $categorias) {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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

const MIS_SERVICIOS = gql`
  query {
    misServicios {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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

const MIS_SERVICES_POR_BUSQUEDA = gql`
  query misServiciosPorBusqueda($busqueda: String!) {
    misServiciosPorBusqueda(busqueda: $busqueda) {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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

const MIS_SERVICES_POR_CATEGORIAS = gql`
  query misServiciosPorCategorias($categorias: InputIDCategoriasSeleccionadas!) {
    misServiciosPorCategorias(categorias: $categorias) {
      _id
      titulo
      descripcion
      precio {
        valor
        moneda {
          tag
        }
      }
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
  constructor(private apollo: Apollo) { }

  services(): any {
    return this.apollo.watchQuery({
      query: SERVICIOS,
    })
  }

  servicesBySearch(busqueda: String): any {
    return this.apollo.watchQuery({
      query: SERVICES_POR_BUSQUEDA,
      variables: {
        busqueda
      }
    })
  }

  servicesByCategories(categorias: Categoria[]): any {
    const IDsCategoriasSeleccionadas: String[] = [];
    categorias.forEach(categoria => {
      if (categoria.seleccionada) IDsCategoriasSeleccionadas.push(categoria._id || '');
    });

    return this.apollo.watchQuery({
      query: SERVICES_POR_CATEGORIAS,
      variables: {
        categorias: { categoriasIDs: IDsCategoriasSeleccionadas }
      }
    })
  }

  myServices(): any {
    return this.apollo.watchQuery({
      query: MIS_SERVICIOS,
    })
  }

  myServicesBySearch(busqueda: String): any {
    return this.apollo.watchQuery({
      query: MIS_SERVICES_POR_BUSQUEDA,
      variables: {
        busqueda
      }
    })
  }

  myServicesByCategories(categorias: Categoria[]): any {
    const IDsCategoriasSeleccionadas: String[] = [];
    categorias.forEach(categoria => {
      if (categoria.seleccionada) IDsCategoriasSeleccionadas.push(categoria._id || '');
    });

    return this.apollo.watchQuery({
      query: MIS_SERVICES_POR_CATEGORIAS,
      variables: {
        categorias: { categoriasIDs: IDsCategoriasSeleccionadas }
      }
    })
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
    })
  }
}
