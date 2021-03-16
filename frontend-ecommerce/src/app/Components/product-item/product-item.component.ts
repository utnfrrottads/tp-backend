import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { Product } from 'src/app/Models/product';
import { BranchService } from 'src/app/Services/branch.service';
import { ProductService } from 'src/app/Services/product.service';

export interface IMyBranches {
  'desc': string;
  '_id': string;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() article = new Article()
  @Output() addArticle = new EventEmitter<Product>()

  public availableProducts: Array<Product>
  public availableBranches: Array<IMyBranches>
  
  constructor(private branchService: BranchService, private productService: ProductService) {
    this.availableProducts = []
    this.availableBranches = []
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
          console.log(err)
        } 
    })
  }

  addProduct(id: string){
      console.log(id)
  }

  cancelAddProduct(){
      document.getElementById(`branchPicker${this.article._id}`)?.setAttribute('style', 'display: none')
  }

}
