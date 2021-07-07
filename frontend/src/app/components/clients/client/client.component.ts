import { Component, OnInit } from '@angular/core';

import { ClientService } from "../../../services/client/client.service";

import { Client } from '../../../models/client/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getClients()
      .subscribe(
        res => this.clients = res,
        err => console.log(err)
      );
  }

  deleteClient(id: number){
    if(confirm("Seguro que desea eliminar el cliente?")){
      this.clientService.deleteClient(id)
        .subscribe(
          res => this.getAll(),
          err => console.log(err)
        );
    }
  }

}
