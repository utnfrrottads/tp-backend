import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private user: UserService, private http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000/api/ventas/';

  isInCart(producto) {
    let items = JSON.parse(localStorage.getItem('carrito'));
    if (items === null || items === []) {
      return false;
    } else {
      let repeated = items.filter((e) => e._id === producto._id);
      if (repeated.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  }
  updateCantComprar(producto) {
    let items = JSON.parse(localStorage.getItem('carrito'));
    let item;
    items.forEach((element) => {
      if (element._id === producto._id) {
        element.cantComprar = producto.cantComprar;
      }
    });

    localStorage.setItem('carrito', JSON.stringify(items));
  }

  addToCart(producto) {
    console.log(producto);
    let items = JSON.parse(localStorage.getItem('carrito'));
    if (items == null) {
      // primera vez abriendo el carrito.
      localStorage.setItem('carrito', JSON.stringify([producto]));
    } else {
      items.push(producto);
      localStorage.setItem('carrito', JSON.stringify(items));
    }
  }
  removeFromCart(producto) {
    let items = JSON.parse(localStorage.getItem('carrito'));
    //let item = items.filter((e) => e._id === producto._id);
    let item;
    items.forEach((element) => {
      if (element._id === producto._id) {
        item = element;
      }
    });
    const index = items.indexOf(item);
    //console.log(index)
    items.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(items));
  }
  getCart() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito == null) {
      carrito = [];
    }
    return carrito;
  }

  getCartPrice() {
    const carrito = this.getCart();
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total += carrito[i].cantComprar * carrito[i].precio;
    }
    return total;
  }

  postBuy(comisionistaVenta) {
    let carrito = this.getCart();
    let productosComprados = [];

    for (let i = 0; i < carrito.length; i++) {
      let cant = carrito[i].cantComprar;
      let prod = carrito[i];
      delete prod.cantComprar;
      productosComprados.push({
        producto: prod,
        cantidad: cant,
      });
    }

    
    let body = {
      productos: productosComprados,
      comisionista: comisionistaVenta,
      idComprador: this.user.getLocalUser()._id,
    };
    console.log('body', body);
    return this.http.post(this.baseURL, body, {});
  }
}
