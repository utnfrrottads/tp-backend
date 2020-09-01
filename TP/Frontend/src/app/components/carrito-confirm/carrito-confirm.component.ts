import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ComisionistasService } from 'src/app/services/comisionistas.service';
import { VentasService } from 'src/app/services/ventas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carrito-confirm',
  templateUrl: './carrito-confirm.component.html',
  styleUrls: ['./carrito-confirm.component.scss'],
})
export class CarritoConfirmComponent implements OnInit {
  constructor(
    private comisionistasService: ComisionistasService,
    private ventaService: VentasService,
    private user: UserService
  ) {}


  comisionistas: any = [];
  IdComisionistaSeleccionado: any;
  metodoPago = 'efectivo';

  @Input() stepper: any;
  @Output() comisionista = new EventEmitter<any>();

  ngOnInit(): void {
    this.comisionistasService.getComisionistas().subscribe((res) => {
      this.comisionistas = res;
      this.IdComisionistaSeleccionado = res[0]._id;
    });
  }

  finalPrice() {
    //traigo el comisionista.
    const com = this.selectComisionistaByID(this.IdComisionistaSeleccionado);
    if (com != undefined) {
      return this.ventaService.getCartPrice() + com.precio;
    }
  }

  selectComisionistaByID(id) {
    let com = this.comisionistas.find((obj) => {
      return obj._id === id;
    });
    this.comisionista.emit(com);
    return com;
  }
}
