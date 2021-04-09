import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Branch } from 'src/app/Models/branch';
import { Sale } from 'src/app/Models/sale';
import { User } from 'src/app/Models/user';
import { Product } from 'src/app/Models/product';
import { SaleService } from 'src/app/Services/sale.service';
import { ProductService } from 'src/app/Services/product.service';
import { ArticleService } from 'src/app/Services/article.service';
import { BranchService } from 'src/app/Services/branch.service';

export interface IMyCartItem {
  'article': Article;
  'qty': number;
  'branch': Branch
}

@Component({
  selector: 'app-my-buys',
  templateUrl: './my-buys.component.html',
  styleUrls: ['./my-buys.component.scss']
})
export class MyBuysComponent implements OnInit {

  public myBuys: Array<Sale>
  public consultedSale: Sale
  public cartArticle: Array<IMyCartItem>

  constructor(
    private productService: ProductService,
    private articleService: ArticleService,
    private branchService: BranchService,
    private saleService: SaleService) 
  {
    this.getSales()
    this.myBuys = []
    this.consultedSale = new Sale({})
    this.cartArticle = []
   }

  ngOnInit(): void {
  }

  getSales(){
    var CurrentUser = JSON.parse(localStorage.getItem('CurrentUser') || JSON.stringify(new User()));
    this.saleService.getSalesByUser(CurrentUser._id).subscribe(res => {
      this.myBuys = res as Array<Sale>
    })
  }

  mapConsultedBuy(sale: Sale){
    this.consultedSale = sale
    this.cartArticle = []
    this.consultedSale.cart.forEach(item => {
      this.productService.getProduct(item.product).subscribe(res => { 
        var prod = res as Product
        var cartItem = {'article':new Article(), 'qty': 0, 'branch': new Branch()}
        this.articleService.getArticle(prod.article).subscribe(res => {
          cartItem.article = res as Article
        })
        this.branchService.getById(prod.branch).subscribe(res => {
          cartItem.branch = res as Branch
        })
        cartItem.qty = item.quantity
        this.cartArticle.push(cartItem)
      })
    })
  }

}
