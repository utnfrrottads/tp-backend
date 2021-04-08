import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { CartItem } from 'src/app/Models/cart-item';
import { Product } from 'src/app/Models/product';
import { Sale } from 'src/app/Models/sale';
import { ArticleService } from 'src/app/Services/article.service';
import { BranchService } from 'src/app/Services/branch.service';
import { ProductService } from 'src/app/Services/product.service';

export interface IMyBranches {
  'desc': string;
  '_id': string;
}

export interface IMyProduct {
  'prod': string;
  'qty': number;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() article = new Article()
  @Input() item = {'article':new Article(), 'qty': 0, 'branch': new Branch()}
  @Input() mode = "market"
  @Output() addArticle = new EventEmitter<IMyProduct>()
  @Output() getError = new EventEmitter<string>()
  @Output() deleteItem = new EventEmitter<Product>()
  @Output() updateItem = new EventEmitter<IMyProduct>()
  

  public availableProducts: Array<Product>
  public availableBranches: Array<IMyBranches>
  public message: string = ""
  public branchDesc: string = ""
  
  constructor(private branchService: BranchService, private productService: ProductService, private articleService: ArticleService) {
    this.availableProducts = []
    this.availableBranches = []
  }
  
  
  ngOnInit(): void {
  }

  showBranches(){
    if(this.mode === "market"){
      document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: block')
    } else {
      document.getElementById(`branchPickerCart${this.item.article._id}`)?.setAttribute('style', 'display: block')
    }
      
  }

  checkQuantity(qty: string){
    this.availableBranches = []
    var elem: Article
    if(this.mode === "market"){
      elem = this.article
    } else{
      elem = this.item.article
    }
    this.productService.getWithStock(elem, Number.parseInt(qty)).subscribe({
        next: res => {
          this.availableProducts = res as Array<Product>
          this.availableProducts.forEach( prod => {
            this.branchService.getById(prod.branch).subscribe(res => {
              var branch = res as Branch
              this.availableBranches.push({desc: `${branch.street}, ${branch.number}`, _id: prod._id})
            })
          })
          if(this.mode === "market"){
            document.getElementById(`branchSelect${this.article._id}`)?.removeAttribute('Disabled')
          } else {
            document.getElementById(`branchSelectCart${this.item.article._id}`)?.removeAttribute('Disabled')
          }
      },
        error: err => {
          this.message = JSON.parse(JSON.stringify(err)).error.error
          this.availableBranches = []
          this.getError.emit(this.message);
        } 
    })
  }

  addProduct(id: string, qty: string){
    this.availableBranches = []
    document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: none')
    var prod= {'prod': id , 'qty': Number.parseInt(qty)}
    this.addArticle.emit(prod);
  }

  updateProduct(id: string, qty: string){
    this.availableBranches = []
    document.getElementById(`branchPickerCart${this.item.article._id}`)?.setAttribute('style', 'display: none')
    var prod= {'prod': id, 'qty': Number.parseInt(qty)}
    this.updateItem.emit(prod)
  }



  cancelAddProduct() {
    this.availableBranches = [] 
    if(this.mode==="market"){
      document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: none')
    } else {
      document.getElementById(`branchPickerCart${this.item.article._id}`)?.setAttribute('style', 'display: none')
    }
  }

  removeProduct() {
    this.productService.getProducts().subscribe(res => {
      var products = res as Array<Product>
      products.forEach((prod) => {
        if(prod.article == this.item.article._id && prod.branch == this.item.branch._id){
          this.deleteItem.emit(prod)
        }
      })
    })
  }

}
