import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/models/article/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;

  constructor() { 
    this.article = new Article();
  }

  ngOnInit(): void {
  }

  addArticle(form: NgForm){
    console.log(form.value);
  }
}
