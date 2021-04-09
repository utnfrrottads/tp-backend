import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../Models/sale';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  selectedSale: Sale
  sales: Sale[]

  readonly API_URL = "http://localhost:3000/api/sale/"

  constructor(private http:HttpClient) {
    this.selectedSale= new Sale({})
    this.sales = []
   }

   getSalesByUser(id: string){
    return this.http.get(`${this.API_URL}byUser/${id}`)
  }

   getSales(){
     return this.http.get(this.API_URL)
   }

   getSale(sale:Sale){
    return this.http.get(this.API_URL+`${sale._id}`)
   }

   postSale(sale:Sale){
    return this.http.post(this.API_URL, sale)
   }

   putSale(sale:Sale){
    return this.http.put(this.API_URL+`${sale._id}`, sale)
   }

   deleteSale(sale:Sale){
    return this.http.delete(this.API_URL+`${sale._id}`)
   }

   getNextTransNumber(){
    return this.http.get(`${this.API_URL}nextNumber/`)
   }

}
