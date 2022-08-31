import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { Product } from 'src/app/Models/product';
import { ArticleService } from 'src/app/Services/article.service';
import { BranchService } from 'src/app/Services/branch.service';
import { ProductService } from 'src/app/Services/product.service';

export interface MyBranches {
  desc: string;
  _id: string;
}

export interface MyProduct {
  prod: string;
  qty: number;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() article = new Article()
  @Input() item = {'article':new Article(), 'qty': 0, 'branch': new Branch()}
  @Input() mode = 'market'
  @Output() addArticle = new EventEmitter<MyProduct>()
  @Output() getError = new EventEmitter<string>()
  @Output() deleteItem = new EventEmitter<Product>()
  @Output() updateItem = new EventEmitter<MyProduct>()
  
  public availableProducts: Array<Product>
  public availableBranches: Array<MyBranches>
  public stockAvailable = true
  public message: string = ''
  public branchDesc: string = ''

  branchSelectDisabled = true;
  branchSelectCartDisabled = true;
  
  branchPickerVisible = false;
  branchPickerCartVisible = false;

  constructor(
    private branchService: BranchService, 
    private productService: ProductService,
    private articleService: ArticleService) {
    this.availableProducts = []
    this.availableBranches = []
  }
  
  
  ngOnInit(): void {
    this.productService.getWithStock(this.article, 1).subscribe({
      next: x=>{
        this.stockAvailable=true
      },
      error: e => {
        this.stockAvailable=false
      }
  })
  }

  showBranches(){
    if(this.mode === 'market'){
      this.branchPickerVisible = true;
    } else {
      this.branchPickerCartVisible = true;
    }
      
  }

  checkQuantity(qty: string){
    this.availableBranches = []
    let elem: Article
    if(this.mode === 'market'){
      elem = this.article
    } else{
      elem = this.item.article
    }
    this.productService.getWithStock(elem, Number.parseInt(qty)).subscribe({
        next: res => {
          this.availableProducts = res as Array<Product>
          this.availableProducts.forEach( prod => {
            this.branchService.getById(prod.branch).subscribe(res => {
              let branch = res as Branch
              this.availableBranches.push({desc: `${branch.street}, ${branch.number}`, _id: prod._id})
            })
          })
          if(this.mode === 'market'){
            this.branchSelectDisabled = false;
          } else {
            this.branchSelectCartDisabled = false;
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
    this.branchPickerVisible = false;
    let prod= {'prod': id , 'qty': Number.parseInt(qty)}
    this.addArticle.emit(prod);
  }

  updateProduct(id: string, qty: string){
    this.availableBranches = []
    this.branchPickerCartVisible = false;
    let prod= {'prod': id, 'qty': Number.parseInt(qty)}
    this.updateItem.emit(prod)
  }



  cancelAddProduct() {
    this.availableBranches = [] 
    if(this.mode==='market'){
      this.branchPickerVisible = false;
    } else {
      this.branchPickerCartVisible = false;
    }
  }

  removeProduct() {
    this.productService.getProducts().subscribe(res => {
      let products = res as Array<Product>
      products.forEach((prod) => {
        if(prod.article == this.item.article._id && prod.branch == this.item.branch._id){
          this.deleteItem.emit(prod)
        }
      })
    })
  }

}
