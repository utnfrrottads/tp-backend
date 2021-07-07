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

  deletePurchase(id_articulo: number, id_proveedor: number, fecha_compra: Date){
    return this.http.delete(`${this.URL}/deletePurchase/${id_articulo}/${id_proveedor}/${fecha_compra}`)
  } 

  getSupplierPurchases(id_proveedor: number){
    return this.http.get<any[]>(`${this.URL}/purchases/${id_proveedor}`)
  }
}