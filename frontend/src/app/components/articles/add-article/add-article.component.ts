import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';
import { Supplier } from '../../../models/supplier/Supplier';
import { ClientSupplier } from './../../../models/client-supplier/client-supplier';

import { ArticleService } from "../../../services/article/article.service";
import { SupplierService } from "../../../services/supplier/supplier.service";


import { Router } from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  supplier: Supplier;
  clientSupplier: ClientSupplier;
  suppliers: Supplier[] = [];
  

  constructor(
    private articleService: ArticleService, 
    private router: Router,
    private supplierService: SupplierService
  ) { 
    this.article = new Article();
    this.supplier = new Supplier();
    this.clientSupplier = new ClientSupplier();

    this.supplier.setProvArt(this.clientSupplier);
    this.article.setSupplier(this.supplier);
  }
  

  ngOnInit(): void {
    this.supplierService.getSuppliers()
      .subscribe(
        res => {
          console.log(res);
          this.suppliers = res;
        },
        err => console.log(err)
      )
  }


  addArticle(){
     this.articleService.addArticle(this.article)
      .subscribe(
        res => {
          this.router.navigate(['/articles']);
        },
        err => console.log(err)
      ); 
  }


}
