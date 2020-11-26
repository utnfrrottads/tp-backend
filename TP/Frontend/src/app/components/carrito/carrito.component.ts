import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UserService } from 'src/app/services/user.service';
import { DialogFinishVentaComponent } from '../dialog-finish-venta/dialog-finish-venta.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  comisionista: any;
  logedUser: any;

  constructor(
    private ventas: VentasService,
    private user: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logedUser = this.user.getLocalUser();
  }

  canGoNextStep(): boolean {
    this.list = this.ventas.getCart();
    if (this.list.length > 0 && this.user.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  onComisionistaChanged(event): void {
    this.comisionista = event;
  }
  comisionistaNombre(): string {
    if (this.comisionista === undefined) {
      return '';
    }
    return this.comisionista.nombre;
  }
  comisionistaPrice(): any {
    if (this.comisionista === undefined) {
      return 0;
    }
    return this.comisionista.precio;
  }

  finalPrice(): any {
    return this.ventas.getCartPrice() + this.comisionistaPrice();
  }

  finishBuy(): void {
    this.ventas.postBuy(this.comisionista).subscribe((res: any) => {
      if (res.status === 'Venta Saved') {
        // vacio el carrito.
        const dialogRef = this.dialog.open(DialogFinishVentaComponent, {});

        dialogRef.afterClosed().subscribe((result) => {
          this.ventas.clearCart();
          if (result === 'compras') {
            this.router.navigate(['/compraventa/compras']);
          } else {
            this.router.navigate(['/rubros']);
          }
        });
      }
    });
  }
}
