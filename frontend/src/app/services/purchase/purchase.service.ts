import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleSupplier } from '../../models/article-supplier/article-supplier';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  addPurchase(purchase: ArticleSupplier){
    return this.http.post(`${this.URL}/addPurchase`, purchase);
  }

  getPurchases(){
    return this.http.get<ArticleSupplier[]>(`${this.URL}/purchases`);
  }
}
