import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-compra-venta',
  templateUrl: './dialog-compra-venta.component.html',
  styleUrls: ['./dialog-compra-venta.component.scss']
})
export class DialogCompraVentaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  calcularTotal(): number {
    let total = 0;

    this.data.venta.productos.forEach(p => {
      total += p.producto.precio * p.cantidad;
    });
    if (this.data.modo === 'Ventas') {
      return total;
    }
    else {
      return total + this.data.venta.comisionista.precio;
    }

  }
}
