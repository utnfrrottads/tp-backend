import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from '../../model/productos';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { VentasService } from 'src/app/services/ventas.service';

declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProducto: string;
  carrouselElems: any;
  carrouselInstance: any;
  producto = new Producto();
  vendedor: any = {};
  usuario: any = {};
  vendedorIsNotComprador: any;
  imagenVendedor =
    'https://res.cloudinary.com/elcurco8/image/upload/v1598910919/TTADS-TP/user_ybrhuc.png';

  constructor(
    private route: ActivatedRoute,
    private ventaService: VentasService,
    private productService: ProductCardsService,
    private userService: UserService,
    private router: Router,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuario = this.userService.getLocalUser();

    this.idProducto = this.route.snapshot.paramMap.get('idProducto');

    this.productService.getProducto(this.idProducto).subscribe((res: Producto) => {
      this.producto = res;
      this.userService.getUser(this.producto.idVendedor).subscribe((res) => {
        this.vendedor = res;
        this.imagenVendedor = this.vendedor.url;

        // para el carousel
        this.carrouselElems = document.querySelectorAll('.carousel');
        const options = {
          fullWidth: true,
          indicators: true,
          shift: 5,
          padding: 5,
          numVisible: 5,
          dist: -999,
        };
        this.carrouselInstance = M.Carousel.init(this.carrouselElems, options);
      });
    });
  }
  ngAfterViewInit() {}
  addToCart() {
    this.isInCart();
    this.producto.cantComprar = 1;
    this.ventaService.addToCart(this.producto);
  }
  removeFromCart() {
    this.isInCart();
    this.ventaService.removeFromCart(this.producto);
  }

  isInCart() {
    return this.ventaService.isInCart(this.producto);
  }

  prevImage() {
    const instance = M.Carousel.getInstance(this.carrouselElems[0]);
    instance.prev();
  }
  nextImage() {
    const instance = M.Carousel.getInstance(this.carrouselElems[0]);
    instance.next();
  }

  vendedorIsnotComprador() {
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

  editPublicacion(id) {
    this.router.navigate(['productos/editar/', id]);
  }

  deletePublicacion(id) {

    this.dialogo
      .open(DialogoComponent, {
        data: {
          mensaje: `¿Realmente deseas eliminar este producto?`,
          tipoDialogEliminar: true,
          tipoDialogAceptar: false,
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
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
              .subscribe((confirmado: Boolean) => {
                if (confirmado) {
                  this.router.navigate(['rubros']);
                }
                (err) => {
                  alert('No se pudo eliminar el producto');
                };
              });
          });
        }
      });
  }
}
