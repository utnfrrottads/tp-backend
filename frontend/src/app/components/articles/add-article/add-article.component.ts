import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  edit: boolean = false;
  params: number;
  

  constructor(
    private articleService: ArticleService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.article = new Article();
  }
  

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params.id;
    if (this.params) {
      this.edit = true;
      this.getArticle();
    }
  }


  addArticle(){
    this.articleService.addArticle(this.article)
      .subscribe(
        res => this.router.navigate(['/articles']),
        err => console.log(err)
      );
  }

  editArticle(){
     this.articleService.editArticle(this.params, this.article)
      .subscribe(
        res => this.router.navigate(['/articles']),
        err => console.log(err)
      )
  }


  getArticle(){
    this.articleService.getArticle(this.params)
      .subscribe(
        res => this.article = res,
        err => console.log(err)
      )
  }

  cancel(){
    if(confirm('Desea cancelar?')){
      this.router.navigate(['/articles']);
    }
  }


}
