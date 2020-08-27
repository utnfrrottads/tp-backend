import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor() {}

  isInCart(producto) {
    let items = JSON.parse(localStorage.getItem('carrito'));
    console.log(items);
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

  addToCart(producto) {
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
    let item = items.filter((e) => e._id === producto._id);
    const index = items.indexOf(item);
    items.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(items));
  }
}
