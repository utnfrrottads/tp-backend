import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from '../../model/productos';
import { Persona } from '../../model/personas';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';

declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProducto: string;
  CarrouselElems: any;
  CarrouselInstance: any;
  producto = new Producto();
  vendedor: any;
  usuario: any;
  vendedorIsNotComprador: any;
  imagenVendedor: string =
    'https://res.cloudinary.com/elcurco8/image/upload/v1598910919/TTADS-TP/user_ybrhuc.png';

  constructor(
    private route: ActivatedRoute,
    private ventas: VentasService,
    private pService: ProductCardsService,
    private userService: UserService,
    private vService: UserService,
    private router: Router,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    //el usuario es el que tengo en el localStorage
    this.usuario = this.userService.getLocalUser();

    // me traigo el id de Producto
    this.idProducto = this.route.snapshot.paramMap.get('idProducto');
    //me traigo el producto
    this.pService.getProducto(this.idProducto).subscribe((res: Producto) => {
      this.producto = res;
      //me traigo el vendedor
      this.vService.getUser(this.producto.idVendedor).subscribe((res) => {
        this.vendedor = res;
        this.imagenVendedor = this.vendedor.url;
      });
    });
  }
  ngAfterViewInit() {
    // para el carousel
    this.CarrouselElems = document.querySelectorAll('.carousel');
    const options = {
      fullWidth: true,
      indicators: true,
      shift: 5,
      padding: 5,
      numVisible: 5,
      dist: -999,
    };
    this.CarrouselInstance = M.Carousel.init(this.CarrouselElems, options);
  }
  addToCart() {
    this.isInCart();
    this.producto.cantComprar = 1;
    this.ventas.addToCart(this.producto);
  }
  removeFromCart() {
    this.isInCart();
    this.ventas.removeFromCart(this.producto);
  }

  isInCart() {
    return this.ventas.isInCart(this.producto);
  }

  prevImage() {
    let instance = M.Carousel.getInstance(this.CarrouselElems[0]);
    instance.prev();
  }
  nextImage() {
    let instance = M.Carousel.getInstance(this.CarrouselElems[0]);
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
    //esto me abre el dialog
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
        //si me confirmó que quiere borrar el producto, entonces abro este dialog informandole
        if (confirmado) {
          this.pService.deleteProducto(this.producto).subscribe((res) => {
            //tengo que ver si hay errores en la borrada (no hecho)
            this.dialogo
              .open(DialogoComponent, {
                data: {
                  mensaje: `Producto eliminado`,
                  tipoDialogEliminar: false,
                  tipoDialogAceptar: true,
                },
              })
              .afterClosed()
              .subscribe((confirmado: Boolean) => {
                //cuando me confirmó que vio el dialog de que se borró el producto, entonces lo redirijo
                //a la pagina principal
                if (confirmado) {
                  this.router.navigate(['rubros']);
                }
                (err) => {
                  //si no se pudo eliminar el producto, tengo que manejarlo desde acá
                  alert('No se pudo eliminar el producto');
                };
              });
          });
        }
      });
  }
}
