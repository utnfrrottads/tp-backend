import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from "../../../services/article/article.service";
import { SupplierService } from '../../../services/supplier/supplier.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

import { Supplier } from '../../../models/supplier/Supplier';
import { Article } from '../../../models/article/article';
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';



@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  purchase: ArticleSupplier = new ArticleSupplier();
  date: Date = new Date();
  fecha: string;
  suppliers: Supplier[] = [];
  articles: Article[] = [];
  status: Boolean = true;

  constructor(
    private articleService: ArticleService,
    private supplierService: SupplierService,
    private purchaseService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fecha = this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
    this.getArticles();
    this.getSuppliers();
  }

  getArticles(){
    this.articleService.getArticles()
      .subscribe(
        res => this.articles = res,
        err => console.log(err)
      )
  }
    
  getSuppliers(){
    this.supplierService.getSuppliers()
        .subscribe(
          res => {
            this.suppliers = res;
          },
          err => console.log(err)
        )
  }

  
  addPurchase(){
    this.articleService.loadStock(this.purchase)
      .subscribe(
        res => this.router.navigate(['/purchases']),
        err => this.status = false
      )

    this.purchaseService.addPurchase(this.purchase)
        .subscribe(
          res => console.log(res),
          err => this.status = false
        )

    if (this.status) {
      this.router.navigate(['/purchases']);
    } else {
      console.log("Error");
    }
  }


}
