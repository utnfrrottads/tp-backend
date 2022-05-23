import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const MONEDAS = gql`
  {
    monedas {
      _id
      tag
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  constructor(private apollo: Apollo) { }

  monedas(): any {
    return this.apollo.watchQuery({
      query: MONEDAS,
      pollInterval: 30000,
    })
  }

}
