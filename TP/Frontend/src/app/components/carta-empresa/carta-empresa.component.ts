import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/model/empresas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carta-empresa',
  templateUrl: './carta-empresa.component.html',
  styleUrls: ['./carta-empresa.component.scss']
})
export class CartaEmpresaComponent implements OnInit {

  @Input() empresa: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getProductosByEmpresa(id) {
    this.router.navigate(['/rubros/empresas', id]);
  }

}
