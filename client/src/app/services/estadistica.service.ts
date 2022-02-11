import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ESTADISTICAS = gql`
  {
    estadisticas {
      contratosRealizados
      contratistasRegistrados
      prestadoresRegistrados
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private apollo: Apollo) { }

  estadisticas(): any {
    return this.apollo.watchQuery({
      query: ESTADISTICAS,
      pollInterval: 10000,
    })
  }

}
