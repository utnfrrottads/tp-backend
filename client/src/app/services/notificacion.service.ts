import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const MIS_NOTIFICACIONES = gql`
  query misNotificaciones {
    misNotificaciones {
      _id
      descripcion
      link
      fechaHora
      leida
    }
  }
`;

const LEER_NOTIFICACIONES = gql`
  mutation {
    readNotifications {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private apollo: Apollo) { }

  misNotificaciones(): any {
    return this.apollo.watchQuery({
      query: MIS_NOTIFICACIONES,
      fetchPolicy: 'no-cache',
      pollInterval: 10000
    })
  }

  leerNotificaciones(): any {
    return this.apollo.mutate({
      mutation: LEER_NOTIFICACIONES
    });
  }

}
