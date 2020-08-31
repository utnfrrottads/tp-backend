import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  producto = new Producto();
  vendedor : any;  
  usuario: any;
  eSlider: any;
  slider: any;
  eBox: any;
  box: any;
  vendedorIsNotComprador: any;

  constructor(
    private route: ActivatedRoute, 
    private ventas: VentasService,
    private pService: ProductCardsService,
    private vService: UserService,
    private router:Router
    ) { }

  ngOnInit(): void {  
    //el usuario es el que tengo en el localStorage
    this.usuario = JSON.parse(localStorage.getItem('user'));

    // me traigo el id de Producto
    this.idProducto = this.route.snapshot.paramMap.get('idProducto');
    //me traigo el producto
    this.pService.getProducto(this.idProducto)
      .subscribe((res : Producto) => {
        this.producto = res;
        //me traigo el vendedor
        this.vService.getUser(this.producto.idVendedor)
        .subscribe((res)=>{
          this.vendedor = res;
          this.vendedorIsnotComprador();
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

  vendedorIsnotComprador(){
    if(this.vendedor._id !== this.usuario._id)
      {
        return true;
      }
      else{
        return false;
      }
  }

  editPublicacion(id){
      this.router.navigate(['productos/editar/',id]);

  }

}

