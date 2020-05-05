import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  getClients(){
    return this.http.get(`${this.URL}/clients`);
  }

}
