import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  constructor(private ventas: VentasService) {}

  ngOnInit(): void {
    this.list = this.ventas.getCart();

    //a cada elemento de la lista le agrego una cantidad para comprar
    //por defecto será 1.
    if (this.list != null) {
      this.list.forEach((element) => {
        element.cantComprar = 1;
      });
    }
    else{
      this.list = [];
    }
  }

  add(producto) {
    if (producto.cantComprar < producto.stock) {
      producto.cantComprar++;
    }
  }
  remove(producto) {
    if (producto.cantComprar > 1) {
      producto.cantComprar--;
    }
  }
  delete(producto) {
    this.ventas.removeFromCart(producto);
    this.list = this.ventas.getCart();
  }
  precioFinal() {
    let total = 0;
    this.list.forEach((element) => {
      total += element.cantComprar * element.precio;
    });
    return total;
  }
}
