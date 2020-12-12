import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/productos';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import { VentasService } from 'src/app/services/ventas.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

@Component({
  selector: 'app-product-detail-buy-info',
  templateUrl: './product-detail-buy-info.component.html',
  styleUrls: ['../product-detail/product-detail.component.scss'],
})
export class ProductDetailBuyInfoComponent implements OnInit {
  @Input() producto = new Producto();
  @Input() vendedor: any = {};
  usuario: any = {};

  constructor(
    private ventaService: VentasService,
    private productService: ProductCardsService,
    private userService: UserService,
    private router: Router,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuario = this.userService.getLocalUser();
  }

  addToCart(): void {
    this.isInCart();
    this.producto.cantComprar = 1;
    this.ventaService.addToCart(this.producto);
  }
  removeFromCart(): void {
    this.isInCart();
    this.ventaService.removeFromCart(this.producto);
  }

  isInCart(): any {
    return this.ventaService.isInCart(this.producto);
  }
  vendedorIsnotComprador(): boolean {
    if (this.usuario != null) {
      if (this.vendedor._id !== this.usuario._id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  editPublicacion(id): void {
    this.router.navigate(['productos/editar/', id]);
  }

  deletePublicacion(id): void {
    this.dialogo
      .open(DialogoComponent, {
        data: {
          mensaje: `¿Realmente deseas eliminar este producto?`,
          tipoDialogEliminar: true,
          tipoDialogAceptar: false,
        },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.productService.deleteProducto(this.producto).subscribe((res) => {
            this.dialogo
              .open(DialogoComponent, {
                data: {
                  mensaje: 'Producto eliminado',
                  tipoDialogEliminar: false,
                  tipoDialogAceptar: true,
                },
              })
              .afterClosed()
              .subscribe((confirmed: boolean) => {
                if (confirmed) {
                  this.router.navigate(['rubros']);
                }
              });
          });
        }
      });
  }

  hayStock(): boolean {
    return this.producto.stock > 0;
  }
}
