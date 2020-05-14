import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article = new Article();
  id_articulo: number;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService ) {
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
