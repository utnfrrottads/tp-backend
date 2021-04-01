import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../Models/article';
import { Product } from '../Models/product';

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

   postProduct(product: Product){
     return this.http.post(this.API_URL, product)
   }

   putProduct(product: Product){
     return this.http.put(this.API_URL+`${product._id}`, product)
   }

   deleteProduct(product: Product){
     return this.http.delete(this.API_URL+`${product._id}`)
   }

   getWithStock(article:Article, qty: number){
     return this.http.post(this.API_URL+`stock`, {_id: article._id, qty: qty})
   }
}
