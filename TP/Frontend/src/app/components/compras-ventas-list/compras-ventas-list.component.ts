import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompraVentaComponent } from '../dialog-compra-venta/dialog-compra-venta.component';
import { VentasService } from 'src/app/services/ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-compras-ventas-list',
  templateUrl: './compras-ventas-list.component.html',
  styleUrls: ['./compras-ventas-list.component.scss'],
})
export class ComprasVentasListComponent implements OnInit {
  ventas: any = [];
  modo = '';
  enabledToShowNoItems = false;

  constructor(
    public dialog: MatDialog,
    private service: VentasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.route.params.subscribe((params) => {
      if (params.type === 'ventas') {
        this.modo = 'Ventas';
        this.service.getVentasByUser(user).subscribe((res) => {
          this.ventas = res;
          this.enabledToShowNoItems = true;
        });
      } else {
        if (params.type === 'compras') {
          this.modo = 'Compras';
          this.service.getComprasByUser(user).subscribe((res) => {
            this.ventas = res;
            this.enabledToShowNoItems = true;
          });
        } else {
          this.router.navigate(['/rubros']);
        }
      }
    });
  }

  calcularTotal(venta): number {
    let total = 0;

    venta.productos.forEach((producto) => {
      total += producto.producto.precio * producto.cantidad;
    });
    if (this.modo === 'Ventas') {
      return total;
    } else {
      return total + venta.comisionista.precio;
    }
  }

  openDialog(venta): void {
    this.dialog.open(DialogCompraVentaComponent, {
      data: {
        venta,
        modo: this.modo,
      },
      height: '400px',
      width: '600px',
    });
  }

  hayVentas(): boolean {
    const res = this.enabledToShowNoItems && this.ventas <= 0 ? false : true;
    return res;
  }
}
