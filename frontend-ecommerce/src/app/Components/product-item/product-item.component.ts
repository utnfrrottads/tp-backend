import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/article';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() article = new Article()
  
  constructor() {
   }
  
  
  ngOnInit(): void {
  }


}
