import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Article } from 'src/app/models/article/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<Article[]>(`${this.URL}/articles`);
  }

  addArticle(article: Article){
    return this.http.post(`${this.URL}/addArticle`, article);
  }

  getArticle(id_articulo: number){
    return this.http.get<Article>(`${this.URL}/articles/${id_articulo}`);
  }

}
