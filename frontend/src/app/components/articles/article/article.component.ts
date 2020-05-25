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

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         res => {
           this.articles = res;
         },
         err => {
           console.log(err);
         }
      );
  }

  getSuppliersByArticle(article: Article) {
    return [1, 2];
  }

  deleteArticle(id: number){
    if (confirm('Seguro que desea eliminar el articulo?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        res => {
          this.getAll();
        },
        err => console.log(err)
      )
    }
    
  }

}
