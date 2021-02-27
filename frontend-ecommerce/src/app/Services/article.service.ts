import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL_API = "http://localhost:3000/api/article/"
  selectedArticle: Article
  articles: Article[]

  constructor(private http: HttpClient) {
      this.selectedArticle= new Article()
      this.articles=[]
  }

  getArticle(article: Article){
      return this.http.get(this.URL_API+`${article._id}`)
  }

  getArticles(){
    return this.http.get(this.URL_API)
  }

  postArticle(article: Article){
    return this.http.post(this.URL_API, article)
  }

  putArticle(article: Article){
    return this.http.put(this.URL_API+`${article._id}`, article)
  }

  deleteArticle(article:Article){
    return this.http.delete(this.URL_API+`${article._id}`)
  }



}
