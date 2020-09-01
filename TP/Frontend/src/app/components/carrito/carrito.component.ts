import { Component, OnInit } from '@angular/core';
import { ComisionistasService } from '../../services/comisionistas.service';
import { VentasService } from 'src/app/services/ventas.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  // para que no me deje pasar de arriba el stepper
  falseFormGroup = new FormGroup({
    check: new FormControl(false, Validators.requiredTrue),
  });
  list = [];

  constructor(private ventas: VentasService) {}

  ngOnInit(): void {}

  itemsOnCart() {
    this.list = this.ventas.getCart();
    if (this.list.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
