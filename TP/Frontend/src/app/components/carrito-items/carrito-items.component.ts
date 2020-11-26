import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-carrito-items',
  templateUrl: './carrito-items.component.html',
  styleUrls: ['./carrito-items.component.scss'],
})
export class CarritoItemsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private ventas: VentasService
  ) {}
  list = [];
  @Input() stepper: any;

  ngOnInit(): void {
    this.list = this.ventas.getCart();
  }

  add(producto): void {
    if (producto.cantComprar < producto.stock) {
      producto.cantComprar++;
      this.ventas.updateCantComprar(producto);
    }
  }
  remove(producto): void {
    if (producto.cantComprar > 1) {
      producto.cantComprar--;
      this.ventas.updateCantComprar(producto);
    }
  }

  delete(producto): void {
    const index = this.list.indexOf(producto);
    if (index > -1) {
      this.ventas.removeFromCart(producto);
    }
    this.list = this.ventas.getCart();
  }

  precioFinal() {
    return this.ventas.getCartPrice();
  }

  confirmarCompra() {
    this.stepper.next();
  }
}
