import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from 'src/app/models/article/article';
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';

import { ArticleService } from "../../../services/article/article.service";
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article = new Article();
  supplierPurchase: any[] = [];
  id_articulo: number;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private articleService: ArticleService,
    private supplierService: SupplierService 
    ) { }

  ngOnInit(): void {
    this.id_articulo = this.activatedRoute.snapshot.params.id;
    this.getArticle();
    this.getLastSupplierPurchaseByArticle(this.id_articulo);
  }
  

  getArticle(){
    this.articleService.getArticle(this.id_articulo)
      .subscribe(
        res => {
          this.article = res;
        },
        err => console.log(err)
      );
  }

  
  getLastSupplierPurchaseByArticle(id_articulo: number){
    this.supplierService.lastSuplierPurchaseByArticle(id_articulo) 
      .subscribe(
        res => this.supplierPurchase = res,
        err => console.log(err)
      );
  }


}

  
