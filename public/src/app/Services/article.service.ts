import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MyFilter {
  'name': Array<string>;
  'presentation': Array<string>;
  'notes': Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL_API = environment.baseUrl+'article/';
  selectedArticle: Article;
  articles: Article[];
  allArticles: Article[];
  filters: MyFilter;
  filterValues: MyFilter;

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

  getArticle(article: string){
      return this.http.get(this.URL_API + `${article}`);
  }

  getArticles(filters: object){
    return this.http.post(this.URL_API+ '/Get', filters);
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

  deleteArticle(id: any) {
    return this.http.delete(this.URL_API + id);
  }

}
