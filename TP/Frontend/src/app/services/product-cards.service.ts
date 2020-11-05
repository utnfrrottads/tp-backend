import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCardsService {


  constructor(private http: HttpClient) { }

  readonly baseURL = environment.backendURL + 'productos';

  getProductos() {
    const URL = this.baseURL;
    return this.http.get(URL);
  }

  getProducto(idProducto){
    const URL = this.baseURL + '/' + idProducto;
    return this.http.get(URL);
  }

  getProductosByDescripcion(searchKey) {
    const URL = this.baseURL + '/descripcion/' + searchKey;
    return this.http.get(URL);
  }

  getProductosByRubro(id_rubro) {
    const URL = this.baseURL;
    return this.http.get(URL + '/rubro/' + id_rubro);
  }

  getProductosByEmpresa(id_vendedor) {
    const URL = this.baseURL + '/empresas/' + id_vendedor;
    return this.http.get(URL);

  }

  deleteProducto(producto: any) {
    const URL = this.baseURL + '/' + producto._id;
    return this.http.delete(URL);
  }

  createProducto(producto: any) {
    const body = {
      url: producto.url,
      nombre: producto.nombre,
      rubro: producto.rubro,
      idVendedor: producto.idVendedor,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio,
    };
    return this.http.post(this.baseURL, body, {});
  }

  editProducto(producto: any) {
    const URL = this.baseURL + '/' + producto.idProducto;
    const body = {
      url: producto.url,
      _id: producto.idProducto,
      nombre: producto.nombre,
      rubro: producto.rubro,
      idVendedor: producto.idVendedor,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio,
    };
    return this.http.put(URL, body, {});
  }


  editUser(producto: any) {
    const URL = this.baseURL + '/' + producto.id;
    const body = {
      url: producto.url,
      _id: producto._id,
      nombre: producto.nombre,
      rubro: producto.rubro,
      idVendedor: producto.idVendedor,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio,
    };
    return this.http.put(URL, body, {});
  }

}

