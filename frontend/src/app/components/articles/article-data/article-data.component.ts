import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";
import { Supplier } from 'src/app/models/supplier/Supplier';
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article;
  supplier: Supplier;
  clientSupplier: ArticleSupplier;
  id_articulo: number;


  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService ) {
    this.article = new Article();
    this.supplier = new Supplier();
    this.clientSupplier = new ArticleSupplier();

    this.supplier.setProvArt(this.clientSupplier);
    this.article.setSupplier(this.supplier);
  }

  ngOnInit(): void {
    this.id_articulo = this.activatedRoute.snapshot.params.id;
    this.articleService.getArticle(this.id_articulo)
      .subscribe(
        res => {
          this.article = res;
        },
        err => console.log(err)
      );
  }

}
