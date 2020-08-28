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
  images: any[];
  idProducto : string;
  producto : any;
  vendedor : any;
  eSlider: any;
  slider: any;
  eBox: any;
  box: any;

  constructor(
    private route: ActivatedRoute, 
    private ventas: VentasService,
    private pService: ProductCardsService,
    private vService: UserService
    ) {

  /*  this.producto = {
      _id: 'a',
      idRubro: 1,
      empresa: {
        razonSocial: 'nombre de la empresa',
        localidad: 'Chabas',
        direccion: 'San Martin 1717',
        imagen:
          'https://fotografias.lasexta.com/clipping/cmsimages02/2019/11/14/66C024AF-E20B-49A5-8BC3-A21DD22B96E6/58.jpg',
      },
      nombre: 'Notebook',
      url: [
        'https://http2.mlstatic.com/notebook-lenovo-v15-core-i7-10ma-gen-1tb-ssd-240gb-12gb-D_NQ_NP_718399-MLA41642098919_052020-F.webp',
        'https://http2.mlstatic.com/notebook-intel-dual-core-4gb-500gb-hp-14-pulgadas-hdmi-wifi-D_NQ_NP_935496-MLA31032116361_062019-Q.jpg',
      ],
      precio: 50000,
      descripcion: 'Es una notebook, un producto muy bueno y de alta calidad.',
      stock: 25,
    };

*/
  //  this.images = this.producto.url;
  }

  ngOnInit(): void {
  
  // me traigo el id de Producto
  this.idProducto = this.route.snapshot.paramMap.get('idProducto');
  this.pService.getProducto(this.idProducto)
    .subscribe((res) => {
      this.producto = res;
      console.log(this.producto)
      this.images = this.producto.url;
      this.vService.getUser(this.producto.idVendedor)
        this.vendedor = res;
        console.log(this.vendedor)
      });
  }

  ngAfterViewInit() {
    //slider
    this.eSlider = document.querySelectorAll('.slider');
    this.slider = M.Slider.init(this.eSlider, {
      interval: 9999999,
    });

    //materialboxed
    this.eBox = document.querySelectorAll('.materialboxed');
    this.box = M.Materialbox.init(this.eBox);
  }
  addToCart() {
    this.isInCart();
    this.ventas.addToCart(this.producto);
  }
  removeFromCart() {
    this.isInCart();
    this.ventas.removeFromCart(this.producto);
  }

  isInCart() {
    return this.ventas.isInCart(this.producto);
  }
}
