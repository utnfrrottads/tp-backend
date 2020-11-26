import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Producto } from 'src/app/model/productos';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
@Input() producto: Producto;

  constructor(private router: Router) {
  }

  routeToProduct(idProducto):void{
    this.router.navigate(['/rubros/productos/', idProducto]);
  }

}
