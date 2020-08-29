import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor() {}

  isInCart(producto) {
    let items = JSON.parse(localStorage.getItem('carrito'));
    //console.log(items);
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
  updateCantComprar(producto){

    let items = JSON.parse(localStorage.getItem('carrito'));
    let item;
    items.forEach(element => {
      if(element._id === producto._id){
        element.cantComprar = producto.cantComprar
      }
    });

    localStorage.setItem('carrito', JSON.stringify(items));

  }

  addToCart(producto) {
    console.log(producto)
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
    items.forEach(element => {
      if(element._id === producto._id){
        item = element
      }
    });
    const index = items.indexOf(item);
    //console.log(index)
    items.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(items));
  }
  getCart() {
    return JSON.parse(localStorage.getItem('carrito'));
  }
}
