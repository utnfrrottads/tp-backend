import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Categoria } from 'src/app/models/Categoria';

const SERVICIOS = gql`
  query servicios($busqueda: String!, $categorias: InputIDCategoriasSeleccionadas!) {
    servicios(busqueda: $busqueda, categorias: $categorias) {
      _id
      titulo
      precio {
        valor
        moneda {
          tag
        }
      }
      ubicacion
      categoria {
        _id
        descripcion
      }
      usuario {
        nombreUsuario
      }
    }
  }
`;

const MIS_SERVICIOS = gql`
  query misServicios($busqueda: String!, $categorias: InputIDCategoriasSeleccionadas!) {
    misServicios(busqueda: $busqueda, categorias: $categorias) {
      _id
      titulo
      precio {
        valor
        moneda {
          tag
        }
      }
      ubicacion
      categoria {
        _id
        descripcion
      }
      usuario {
        nombreUsuario
      }
    }
  }
`;

const SERVICE_DETAIL = gql`
  query detalleServicio($_id: String!) {
    detalleServicio(_id: $_id) {
      descripcion
      fechaHoraPublicacion
      usuario {
        nombreApellido
        email
        nivel {
          nro
        }
      }
    }
  }
`;

const PUBLISH_SERVICE = gql`
  mutation publishService(
    $titulo: String!
    $descripcion: String!
    $valor: Float!
    $idMoneda: ID!
    $ubicacion: String!
    $idCategoria: ID!
  ) {
    publishService(
      titulo: $titulo
      descripcion: $descripcion
      valor: $valor
      idMoneda: $idMoneda
      ubicacion: $ubicacion
      idCategoria: $idCategoria
    ) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private apollo: Apollo) { }

  services(busqueda: String, categorias: Categoria[]): any {
    const IDsCategoriasSeleccionadas: String[] = [];
    categorias.forEach(categoria => {
      if (categoria.seleccionada) IDsCategoriasSeleccionadas.push(categoria._id || '');
    });

    return this.apollo.watchQuery({
      query: SERVICIOS,
      variables: {
        busqueda,
        categorias: { categoriasIDs: IDsCategoriasSeleccionadas }
      }
    })
  }

  myServices(busqueda: String, categorias: Categoria[]): any {
    const IDsCategoriasSeleccionadas: String[] = [];
    categorias.forEach(categoria => {
      if (categoria.seleccionada) IDsCategoriasSeleccionadas.push(categoria._id || '');
    });

    return this.apollo.watchQuery({
      query: MIS_SERVICIOS,
      variables: {
        busqueda,
        categorias: { categoriasIDs: IDsCategoriasSeleccionadas }
      }
    })
  }

  serviceDetail(_id: String): any {
    return this.apollo.watchQuery({
      query: SERVICE_DETAIL,
      variables: {
        _id
      }
    })
  }

  publish(service: any): any {
    return this.apollo.mutate({
      mutation: PUBLISH_SERVICE,
      variables: {
        titulo: service.titulo,
        descripcion: service.descripcion,
        valor: service.valor,
        idMoneda: service.moneda,
        ubicacion: service.ubicacion,
        idCategoria: service.categoria,
      },
    })
  }
}
