import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Categoria } from '../models/Categoria';

const CATEGORIA = gql`
  {
    categoria {
      _id
      descripcion
    }
  }
`;

const CATEGORIAS = gql`
  {
    categorias {
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

  categoria(): any {
    return this.apollo.watchQuery({
      query: CATEGORIA
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.categoria;
      })
    )
  }

  categorias(): any {
    return this.apollo.watchQuery({
      query: CATEGORIAS
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.categorias;
      })
    )
  }

}
