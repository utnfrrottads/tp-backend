import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private user: UserService, private http: HttpClient) {}

  readonly baseURL = environment.backendURL + 'ventas/';

  isInCart(producto): boolean {
    const items = JSON.parse(localStorage.getItem('carrito'));
    if (items === null || items === []) {
      return false;
    } else {
      const repeated = items.filter((elem) => elem._id === producto._id);
      if (repeated.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  }
  updateCantComprar(producto): void {
    const items = JSON.parse(localStorage.getItem('carrito'));
    items.forEach((element) => {
      if (element._id === producto._id) {
        element.cantComprar = producto.cantComprar;
      }
    });

    localStorage.setItem('carrito', JSON.stringify(items));
  }

  addToCart(producto): void {
    console.log(producto);
    const items = JSON.parse(localStorage.getItem('carrito'));
    if (items == null) {
      // primera vez abriendo el carrito.
      localStorage.setItem('carrito', JSON.stringify([producto]));
    } else {
      items.push(producto);
      localStorage.setItem('carrito', JSON.stringify(items));
    }
  }
  removeFromCart(producto): void {
    const items = JSON.parse(localStorage.getItem('carrito'));
    let item;
    items.forEach((element) => {
      if (element._id === producto._id) {
        item = element;
      }
    });
    const index = items.indexOf(item);
    items.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(items));
  }
  getCart(): any {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito == null) {
      carrito = [];
    }
    return carrito;
  }

  clearCart(): void {
    localStorage.removeItem('carrito');
  }

  getCartPrice(): any {
    const carrito = this.getCart();
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total += carrito[i].cantComprar * carrito[i].precio;
    }
    return total;
  }

  postBuy(comisionistaVenta): any {
    const carrito = this.getCart();
    const productosComprados = [];

    for (let i = 0; i < carrito.length; i++) {
      const cant = carrito[i].cantComprar;
      const prod = carrito[i];
      delete prod.cantComprar;
      productosComprados.push({
        producto: prod,
        cantidad: cant,
      });
    }

    const body = {
      productos: productosComprados,
      comisionista: comisionistaVenta,
      idComprador: this.user.getLocalUser()._id,
    };
    console.log('body', body);
    return this.http.post(this.baseURL, body, {});
  }

  getVentasByUser(user): any {
    const URL = this.baseURL + 'vendedor/' + user._id;
    return this.http.get(URL);
  }

  getComprasByUser(user): any {
    const URL = this.baseURL + 'comprador/' + user._id;
    return this.http.get(URL);
  }
}
