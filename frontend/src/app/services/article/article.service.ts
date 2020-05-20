import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Article } from 'src/app/models/article/article';
import { ArticleSupplier } from '../../models/article-supplier/article-supplier';

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

  editArticle(id: number, articleUpdated: Article){
    return this.http.put(`${this.URL}/articles/${id}`, articleUpdated);
  }

  deleteArticle(id: number){
    return this.http.put(`${this.URL}/suspendArticle/${id}`, 'Suspend');
  }

  loadStock(purchase: ArticleSupplier){
    return this.http.post(`${this.URL}/loadStock`, purchase);
  }

}
