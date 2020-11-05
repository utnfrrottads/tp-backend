import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {
  empresas:any = []; 
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getEmpresas().subscribe((res) => { 
      this.empresas = res;
    })
  }

}
