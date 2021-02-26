import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
     this.http.get(this.API_URL)
   }

   getProduct(product: Product){
     this.http.get(this.API_URL+`${product._id}`)
   }

   postProduct(product: Product){
     this.http.post(this.API_URL, product)
   }

   putProduct(product: Product){
     this.http.put(this.API_URL+`${product._id}`, product)
   }

   deleteProduct(product: Product){
     this.http.delete(this.API_URL+`${product._id}`)
   }
}
