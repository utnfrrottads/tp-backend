import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const SIGN_CONTRACT = gql`
  mutation signContract($idServicio: ID!) {
    signContract(idServicio: $idServicio) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private apollo: Apollo) { }

  signContract(idServicio: String): any {
    return this.apollo.mutate({
      mutation: SIGN_CONTRACT,
      variables: {
        idServicio
      }
    })
  }

}
