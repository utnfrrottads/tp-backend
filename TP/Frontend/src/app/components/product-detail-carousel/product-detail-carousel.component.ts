import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/productos';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';

declare var M: any;

@Component({
  selector: 'app-product-detail-carousel',
  templateUrl: './product-detail-carousel.component.html',
  styleUrls: ['../product-detail/product-detail.component.scss']
})

export class ProductDetailCarouselComponent implements OnInit {
  @Input() idProducto: string;

  carrouselElems: any;
  carrouselInstance: any;

  vendedor: any = {};
  usuario: any = {};
  producto = new Producto();
  imagenVendedor =
    'https://res.cloudinary.com/elcurco8/image/upload/v1598910919/TTADS-TP/user_ybrhuc.png';

  constructor(
    private productService: ProductCardsService,
    private userService: UserService
    ) { }

  ngOnInit(): void {

    this.productService.getProducto(this.idProducto).subscribe((res: Producto) => {
      this.producto = res;
      this.userService.getUser(this.producto.idVendedor).subscribe((response) => {
        this.vendedor = response;
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

  prevImage(): void {
    const instance = M.Carousel.getInstance(this.carrouselElems[0]);
    instance.prev();
  }
  nextImage(): void {
    const instance = M.Carousel.getInstance(this.carrouselElems[0]);
    instance.next();
  }

}
