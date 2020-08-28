import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from 'src/app/model/productos';
import { Empresa } from 'src/app/model/empresas';
declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
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
    ) { }

  ngOnInit(): void {  
  // me traigo el id de Producto
  this.idProducto = this.route.snapshot.paramMap.get('idProducto');
  //me traigo el producto
  this.pService.getProducto(this.idProducto)
    .subscribe((res) => {
      this.producto = res;
      //me traigo el vendedor
      this.vService.getUser(this.producto.idVendedor)
      .subscribe((res)=>{
        this.vendedor = res;
      })
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
