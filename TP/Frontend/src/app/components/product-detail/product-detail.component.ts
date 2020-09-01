import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import {Producto} from '../../model/productos'
import {Persona} from '../../model/personas'

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
  vendedor : any;
  usuario: any;
  vendedorIsNotComprador: any;

  constructor(
    private route: ActivatedRoute,
    private ventas: VentasService,
    private pService: ProductCardsService,

    private vService: UserService,
    private router:Router
    ) {   }

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
          console.log("vendedor")

          console.log(this.vendedor)
          this.vendedorIsnotComprador();
        })
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
  deletePublicacion(id){
      this.router.navigate(['productos/eliminar/',id]);
  }

}

