import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  comisionista: any;
  logedUser: any;

  constructor(private ventas: VentasService, private user: UserService) {}

  ngOnInit(): void {
    this.logedUser = this.user.getLocalUser();
  }

  canGoNextStep() {
    this.list = this.ventas.getCart();
    if (this.list.length > 0 && this.user.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  onComisionistaChanged(event) {
    this.comisionista = event;
  }
  comisionistaNombre() {
    if (this.comisionista == undefined) {
      return '';
    }
    return this.comisionista.nombre;
  }
  comisionistaPrice() {
    if (this.comisionista == undefined) {
      return 0;
    }
    return this.comisionista.precio;
  }

  finalPrice() {
    return this.ventas.getCartPrice() + this.comisionistaPrice();
  }

  finishBuy() {
    this.ventas.postBuy(this.comisionista).subscribe((res) => {
      console.log(res);
    });
  }
}
