import { Component, OnInit } from '@angular/core';

import { ArticleService } from './../../../services/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         
      )
  }

}
