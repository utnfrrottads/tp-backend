import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/model/empresas';

@Component({
  selector: 'app-carta-empresa',
  templateUrl: './carta-empresa.component.html',
  styleUrls: ['./carta-empresa.component.scss']
})
export class CartaEmpresaComponent implements OnInit {

  @Input() empresa:Empresa;
  
  constructor() { }

  ngOnInit(): void {
  }
  

}
