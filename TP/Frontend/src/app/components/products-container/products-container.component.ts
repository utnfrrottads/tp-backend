import { Component, OnInit } from '@angular/core';
import { ProductCardsService } from '../../services/product-cards.service';
import { ActivatedRoute } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent implements OnInit {
  list:any = [];

  identifier = "";

  constructor(private service: ProductCardsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.identifier = this.route.snapshot.params.idRubro;
    if(this.identifier) {
      this.service.getProductosByRubro(this.identifier).subscribe((res)=> {
        this.list = res;
      })
    }
    else {
      this.service.getProductos().subscribe((res)=> {
        this.list = res;
      })
    }
 

  }
    

}
