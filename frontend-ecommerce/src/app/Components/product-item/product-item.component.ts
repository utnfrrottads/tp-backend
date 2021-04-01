import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { CartItem } from 'src/app/Models/cart-item';
import { Product } from 'src/app/Models/product';
import { BranchService } from 'src/app/Services/branch.service';
import { ProductService } from 'src/app/Services/product.service';

export interface IMyBranches {
  'desc': string;
  '_id': string;
}

export interface IMyProduct {
  'prod': Product;
  'qty': number;
}


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() article = new Article()
  @Input() item = new CartItem()
  @Input() mode = "market"
  @Output() addArticle = new EventEmitter<IMyProduct>()
  @Output() getError = new EventEmitter<string>()
  @Output() deleteItem = new EventEmitter<Product>()
  @Output() updateItem = new EventEmitter<IMyProduct>()
  

  public availableProducts: Array<Product>
  public availableBranches: Array<IMyBranches>
  public message: string = ""
  public branchDesc: string = ""
  
  constructor(private branchService: BranchService, private productService: ProductService) {
    this.availableProducts = []
    this.availableBranches = []
    console.log(this.item)

  }
  
  
  ngOnInit(): void {
  }

  showBranches(){
    document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: block')
  }

  checkQuantity(qty: string){
    this.availableBranches = []
    this.productService.getWithStock(this.article, Number.parseInt(qty)).subscribe({
        next: res => {
          this.availableProducts = res as Array<Product>
          this.availableProducts.forEach( prod => {
            this.branchService.getById(prod.branch).subscribe(res => {
              var branch = res as Branch
              this.availableBranches.push({desc: `${branch.street}, ${branch.number}`, _id: prod._id})
            })
          })
          document.getElementById(`branchSelect${this.article._id}`)?.removeAttribute('Disabled')
      },
        error: err => {
          this.message = JSON.parse(JSON.stringify(err)).error.error
          this.availableBranches = []
          this.getError.emit(this.message);
        } 
    })
  }

  addProduct(id: string, qty: string){
      this.productService.getProduct(id).subscribe( res=> {
        var prod: IMyProduct = {'prod': (res as Product), 'qty': Number.parseInt(qty)}
        this.addArticle.emit(prod);
      }
    );
    this.availableBranches = []
    document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: none')
  }

  cancelAddProduct() {
    this.availableBranches = [] 
    document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: none')
  }

}
