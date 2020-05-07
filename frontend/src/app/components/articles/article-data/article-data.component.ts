import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Article } from 'src/app/models/article/article';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article

  constructor(private activatedRoute: ActivatedRoute) { 
    this.article = new Article();
  }

  ngOnInit(): void {
   /*  this.article = this.activatedRoute.snapshot.params;
    console.log(this.article); */
  }

}
