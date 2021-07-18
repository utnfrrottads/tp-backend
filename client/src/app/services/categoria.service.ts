import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Categoria } from '../models/Categoria';

const CATEGORIAS = gql`
  {
    categorias {
      _id
      descripcion
    }
  }
`;

const ADDCATEGORIA = gql`
  mutation addCategoria($descripcion: String!) {
    addCategoria(descripcion: $descripcion) {
      _id
      descripcion
    }
  }
`;

const DELETECATEGORIA = gql`
  mutation deleteCategoria($_id: String!) {
    deleteCategoria(_id: $_id) {
      _id
      descripcion
    }
  }
`;

const UPDATECATEGORIA = gql`
  mutation updateCategoria($_id: String!, $descripcion: String!) {
    updateCategoria(_id: $_id, descripcion: $descripcion) {
      _id
      descripcion
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private apollo: Apollo) { }

  categorias(): any {
    return this.apollo.watchQuery({
      query: CATEGORIAS
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.categorias;
      })
    )
  }

  addCategoria(categoria: Categoria): any {
    return this.apollo.mutate({
      mutation: ADDCATEGORIA,
      variables: {
        descripcion: categoria.descripcion
      }
    })
  }

  deleteCategoria(_id: String): any {
    return this.apollo.mutate({
      mutation: DELETECATEGORIA,
      variables: {
        _id
      }
    })
  }

  updateCategoria(categoria: Categoria): any {
    return this.apollo.mutate({
      mutation: UPDATECATEGORIA,
      variables: {
        _id: categoria._id,
        descripcion: categoria.descripcion
      }
    })
  }

}
