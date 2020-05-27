import { Component, OnInit } from '@angular/core';

import { ArticleService } from './../../../services/article/article.service';
import { Article } from './../../../models/article/article';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: Article[];
  suppliers: any = [];

  constructor(
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         res => this.articles = res,
         err => console.log(err)
      )
  }

  deleteArticle(id: number){
    if (confirm('Seguro que desea eliminar el articulo?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        res => this.getAll(),
        err => console.log(err)
      )
    }
    
  }

}
