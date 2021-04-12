import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product
  products: Product[]

  readonly API_URL = "http://localhost:3000/api/product/"

  constructor(private http:HttpClient) {
    this.selectedProduct= new Product()
    this.products = []
   }

   getProducts(){
     return this.http.get(this.API_URL)
   }

   getProduct(product: string){
     return this.http.get(this.API_URL+`${product}`)
   }

   getWithStock(article:Article, qty: number){
     return this.http.post(this.API_URL+`stock`, {_id: article._id, qty: qty})
   }

   getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  addProduct(product: any) {
    return this.http.post<any[]>(this.API_URL, product);
  }

  updateProduct(product: any) {
    return this.http.put<any[]>(this.API_URL+ product._id, product);
  }

  getById(id: any): Observable<any>{
    return this.http.get<any[]>(this.API_URL + id);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.API_URL + id);
  }
}
