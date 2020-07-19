import { Component, OnInit } from '@angular/core';
import { ProductCardsService } from '../../services/product-cards.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent implements OnInit {
  lista = [];
  constructor(private service: ProductCardsService) { }

  ngOnInit(): void {
    this.lista = this.getProducts(1);
  }

  getProducts(idRubroBuscado){
    return this.service.getProducts(idRubroBuscado);
  }


}
