import { Component, OnInit } from '@angular/core';
import { ClientSupplier } from './../../../models/client-supplier/client-supplier';

import { ArticleService } from "../../../services/article/article.service";
import { SupplierService } from './../../../services/supplier/supplier.service';
import { Supplier } from './../../../models/supplier/Supplier';
import { Article } from './../../../models/article/article';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  purchase: ClientSupplier = new ClientSupplier();
  date: Date = new Date();
  fecha: string;
  suppliers: Supplier[] = [];
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.fecha = this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
    
    this.articleService.getArticles()
      .subscribe(
        res => {
          this.articles = res;
        },
        err => console.log(err)
      )

      this.supplierService.getSuppliers()
        .subscribe(
          res => {
            this.suppliers = res;
          },
          err => console.log(err)
        )
  }

}
