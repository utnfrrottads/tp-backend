import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Client } from '../../../models/client/client';
import { ClientService } from "../../../services/client/client.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

  client: Client;

  constructor(
    private clientService: ClientService, 
    private router: Router
    ) { 
    this.client = new Client();
  }


  addClient(){
    this.clientService.addClient(this.client)
      .subscribe(
        res => this.router.navigate(['/clients']),
        err => console.log(err)
      );
  }

  cancel(){
    if(confirm('Desea cancelar?')){
      this.router.navigate(['/clients']);
    }
  }

}
