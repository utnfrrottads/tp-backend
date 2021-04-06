import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { Observable } from 'rxjs';

export interface IMyFilter {
  'name': Array<string>;
  'presentation': Array<string>;
  'notes': Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL_API = 'http://localhost:3000/api/article/';
  selectedArticle: Article;
  articles: Article[];
  allArticles: Article[];
  filters: IMyFilter;
  filterValues: IMyFilter;

  constructor(private http: HttpClient) {
      this.selectedArticle = new Article();
      this.articles = [];
      this.allArticles = [];

      this.filters = {
        name: [],
        presentation: [],
        notes: []
      };

      this.filterValues = {
        name: [],
        presentation: [],
        notes: []
      };
  }

  getArticle(article: Article){
    return this.http.get(this.URL_API + `${article._id}`);
  }

  getArticles(filters: object){
    return this.http.post(this.URL_API, filters);
  }

  postArticle(article: Article){
    return this.http.post(this.URL_API, article);
  }

  putArticle(article: Article){
    return this.http.put(this.URL_API + `${article._id}`, article);
  }

  deleteArticle(article: Article){
    return this.http.delete(this.URL_API + `${article._id}`);
  }

  getAllArticles(filters: object): Observable<any[]> {
    return this.http.post<any[]>(this.URL_API, filters);
  }

  addArticles(article: any) {
    return this.http.post<any[]>(this.URL_API, article);
  }

  updateArticles(article: any) {
    return this.http.put<any[]>(this.URL_API + article._id, article);
  }

  getByIdArticles(id: any): Observable<any>{
    return this.http.get<any[]>(this.URL_API + id);
  }

  deleteArticles(id: any) {
    return this.http.delete(this.URL_API + id);
  }

}
