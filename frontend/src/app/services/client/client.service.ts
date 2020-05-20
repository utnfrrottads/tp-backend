import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Client } from './../../models/client/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  getClients(){
    return this.http.get<Client[]>(`${this.URL}/clients`);
  }

  addClient(client: Client){
    return this.http.post(`${this.URL}/addClient`, client);
  }

  getById(id: number){
    return this.http.get<Client>(`${this.URL}/clients/${id}`);
  }

  editClient(id: number, clientUpdated: Client){
    return this.http.put(`${this.URL}/clients/${id}`, clientUpdated);
  }

  deleteClient(id: number){
    return this.http.put(`${this.URL}/deleteClient/${id}`, 'Delete');
  }

}
