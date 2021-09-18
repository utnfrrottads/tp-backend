import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { Sale } from 'src/app/Models/sale';
import { ArticleService } from 'src/app/Services/article.service';
import { BranchService } from 'src/app/Services/branch.service';
import { ToastrService } from 'ngx-toastr'
import { SaleService } from 'src/app/Services/sale.service';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

export interface IMyCartItem {
  'article': Article;
  'qty': number;
  'branch': Branch
}

export interface IMyResponse{
  'status': string
}

@Component({
  selector: 'app-complete-sale',
  templateUrl: './complete-sale.component.html',
  styleUrls: ['./complete-sale.component.scss']
})
export class CompleteSaleComponent implements OnInit {

  public cartArticle: Array<IMyCartItem>

  public totalPrice = 0
  
  public currentSale: Sale

  public currentUser: User

  constructor(private router: Router, private productService: ProductService,private saleService: SaleService,private toastr: ToastrService,private articleService: ArticleService, private branchService: BranchService) {
    this.cartArticle = [] 
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({})))
    var string = localStorage.getItem('CurrentUser') || JSON.stringify(new User());
    this.currentUser = JSON.parse(string)
   }

  ngOnInit(): void {
    this.mapCartItem()
  }

  mapCartItem(){
    this.totalPrice = 0
    this.cartArticle = []
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({})))
    this.currentSale.cart.forEach(item => {
      this.productService.getProduct(item.product).subscribe(res => { 
        var prod = res as Product
        var cartItem = {'article':new Article(), 'qty': 0, 'branch': new Branch()}
        this.articleService.getArticle(prod.article).subscribe(res => {
          cartItem.article = res as Article
          this.updatePrice(cartItem.article.prices[0].price, item.quantity)
        })
        this.branchService.getById(prod.branch).subscribe(res => {
          cartItem.branch = res as Branch
        })
        cartItem.qty = item.quantity
        this.cartArticle.push(cartItem)
      })
    })
  }

  updatePrice(price: number, qty: number) {
    this.totalPrice += price * qty
  }

  clickConfirmButton(postalCode: string, street: string, number: string){
    if(postalCode.length == 0 || street.length == 0 || number.length == 0){
      this.toastr.error("Debe Completar Todos los Campos", "Error")
    } else {
        if(confirm("¿Seguro que desea cofirmar?")) {
          this.confirmSale(postalCode, street, number)
        }
      }
    }

  confirmSale(postalCode: string, street: string, number: string){
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({})))
    this.currentSale.number = number
    this.currentSale.street = street
    this.currentSale.postalCode = postalCode
    this.currentSale.total = this.totalPrice
    this.saleService.postSale(this.currentSale).subscribe({
      next: res =>{
        this.toastr.success((res as IMyResponse).status, "Carga Exitosa")
        localStorage.removeItem("CurrentSale")
        this.router.navigate([''])
      },
      error: err => {
        this.toastr.error(err.error.error, "Error")
      }
    })
  }

}
