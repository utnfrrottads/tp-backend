import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-seller-card',
  templateUrl: './product-detail-seller-card.component.html',
  styleUrls: ['./product-detail-seller-card.component.scss']
})
export class ProductDetailSellerCardComponent {
  @Input() vendedor: any = {};

}
