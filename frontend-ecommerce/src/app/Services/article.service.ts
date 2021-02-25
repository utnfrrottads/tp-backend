import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL_API = "http://localhost:3000/api/article/"
  selectedArticle: Article
  allArticles: Array<Article>

  constructor(private http: HttpClient) {
      this.selectedArticle= new Article()
      this.allArticles=[]
  }

  getArticle(){
    
  }

}
