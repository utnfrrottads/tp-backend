import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';

declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProducto: string;
  producto: any;
  vendedor: any;

  CarrouselElems: any;
  CarrouselInstance: any;

  constructor(
    private route: ActivatedRoute,
    private ventas: VentasService,
    private pService: ProductCardsService,
    private vService: UserService
  ) {}

  ngOnInit(): void {
    
    
    // me traigo el id de Producto
    this.idProducto = this.route.snapshot.paramMap.get('idProducto');
    //me traigo el producto
    this.pService.getProducto(this.idProducto).subscribe((res) => {
      this.producto = res;
      //me traigo el vendedor
      this.vService.getUser(this.producto.idVendedor).subscribe((res) => {
        this.vendedor = res;
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
  prevImage(){
    let instance = M.Carousel.getInstance(this.CarrouselElems[0]);
    instance.prev();
  }
  nextImage(){
    let instance = M.Carousel.getInstance(this.CarrouselElems[0]);
    instance.next();
  }
}
