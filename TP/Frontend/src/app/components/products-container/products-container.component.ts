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

  descripcionParameter = "";
  rubroParameter = "";

  constructor(private service: ProductCardsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => { 
      this.descripcionParameter = params.searchKey;
      this.rubroParameter = params.idRubro;
      if (this.descripcionParameter) {
        this.service.getProductosByDescripcion(this.descripcionParameter).subscribe(res => 
          this.list = res
          );
      }
      else if(this.rubroParameter) {
        this.service.getProductosByRubro(this.rubroParameter).subscribe(res => 
          this.list = res
          )
      }
      else {
        this.service.getProductos().subscribe(res => 
          this.list = res
          )
      }
      console.log(this.descripcionParameter);
      console.log(this.rubroParameter);
    }); 
    /*
      if (this.descripcionParameter) 
        this.service.getProductosByDescripcion(this.descripcionParameter).subscribe((res)=> {
          this.list = res;
          return;
        })
      }
    this.route.params.subscribe((params) => { 
      this.rubroParameter = params.idRubro;
    })
      if (this.rubroParameter) {
        this.service.getProductosByRubro(this.rubroParameter).subscribe((res)=> {
          this.list = res;
          return
        })
      }
      else {
        this.service.getProductos().subscribe((res)=> {
          this.list = res;
      })

    
  }
    /*
    this.identifier = this.route.snapshot.params.idRubro;
    if(this.identifier) {
      this.service.getProductosByRubro(this.identifier).subscribe((res)=> {
        this.list = res;
      })
    }
    else {
      this.identifier = this.route.snapshot.params.searchKey;
      if (this.identifier) {
        this.service.getProductosByDescripcion(this.identifier).subscribe((res)=> {
          this.list = res;
        })}           
      else {
        this.service.getProductos().subscribe((res)=> {
          this.list = res;
      })
    }  
  } }
*/
  }
}
