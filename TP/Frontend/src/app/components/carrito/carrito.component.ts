import { Component, OnInit } from '@angular/core';
import { ComisionistasService } from '../../services/comisionistas.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  comisionistas: any = [];
  IdComisionistaSeleccionado: any;
  comisionistaSeleccionado: any;

  constructor(
    private comisionistasService: ComisionistasService,
    private ventas: VentasService
  ) {}

  ngOnInit(): void {
    this.comisionistasService.getComisionistas().subscribe((res) => {
      this.comisionistas = res;
      this.IdComisionistaSeleccionado = res[0]._id;
    });

    this.list = this.ventas.getCart();

    //a cada elemento de la lista le agrego una cantidad para comprar
    //por defecto será 1.
    /*  if (this.list != null) {
      this.list.forEach((element) => {
        element.cantComprar = 1;
      });
    } else {
      this.list = [];
    }*/
  }

  add(producto) {
    if (producto.cantComprar < producto.stock) {
      producto.cantComprar++;
      this.ventas.updateCantComprar(producto);
    }
  }
  remove(producto) {
    if (producto.cantComprar > 1) {
      producto.cantComprar--;
      this.ventas.updateCantComprar(producto);
    }
  }

  delete(producto) {
    const index = this.list.indexOf(producto);

    if (index > -1) {
      //this.list.splice(index, 1);
      this.ventas.removeFromCart(producto);
    }
    this.list = this.ventas.getCart();
    console.log(this.list);
  }

  precioFinal() {
    // calculo el total de los productos
    let total = 0;
    this.list.forEach((element) => {
      total += element.cantComprar * element.precio;
    });

    // le agrego el comisionista
    let comision = 0;
    if (this.IdComisionistaSeleccionado !== undefined) {
      this.comisionistaSeleccionado = this.comisionistas.filter(
        (e) => e._id == this.IdComisionistaSeleccionado
      )[0];

      comision = this.comisionistaSeleccionado.precio;
    }
    return total + comision;
  }
}
