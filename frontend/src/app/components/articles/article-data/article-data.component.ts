import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from 'src/app/models/article/article';
import { Supplier } from 'src/app/models/supplier/Supplier';

import { ArticleService } from "../../../services/article/article.service";
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article;
  suppliers: any[] = [];
  clientSupplier: ArticleSupplier;
  id_articulo: number;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private articleService: ArticleService,
    private supplierService: SupplierService 
    ) {
    this.article = new Article();
  }

  ngOnInit(): void {
    this.id_articulo = this.activatedRoute.snapshot.params.id;
    this.getArticle();
    this.getSuppliersByArticle(this.id_articulo);
  }

  getArticle(){
    this.articleService.getArticle(this.id_articulo)
      .subscribe(
        res => {
          this.article = res;
        },
        err => console.log(err)
      )};

  
  
  getSuppliersByArticle(id_articulo: number){
    this.supplierService.supliersByArticle(id_articulo) 
      .subscribe(
        res => {
         this.suppliers = res;
        },
        err => {
          console.log(err);
        }
      )
  }


  }

  
