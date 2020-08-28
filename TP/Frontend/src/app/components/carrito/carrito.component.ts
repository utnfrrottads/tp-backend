import { Component, OnInit } from '@angular/core';
import { ComisionistasService } from '../../services/comisionistas.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  comisionistas:any = [];
  comisionistaAnterior=null;

  constructor(
    private comisionistasService: ComisionistasService,
    private ventas: VentasService
    ) {}

  ngOnInit(): void {
    this.comisionistasService.getComisionistas()
    .subscribe((res)=>{
      this.comisionistas = res;
    })

    this.list = this.ventas.getCart();

    //a cada elemento de la lista le agrego una cantidad para comprar
    //por defecto será 1.
    if (this.list != null) {
      this.list.forEach((element) => {
        element.cantComprar = 1;
      });
    }
    else{
      this.list = [];
    }
  }

  add(producto) {
    if (producto.cantComprar < producto.stock) {
      producto.cantComprar++;
    }
  }
  remove(producto) {
    if (producto.cantComprar > 1) {
      producto.cantComprar--;
    }
  } 
  delete(producto) {
    const index = this.list.indexOf(producto);
    if (index > -1) {
      this.list.splice(index, 1);
    }
    this.ventas.removeFromCart(producto);
    this.list = this.ventas.getCart();


    if(producto.idComisionista !== undefined){
      //significa que borré un comisionista
      this.comisionistaAnterior = null;
    }
  }
  precioFinal() {
    let total = 0;
    let precComisionista = 0;
    this.list.forEach((element) => {
      if(element.idComisionista === undefined){
        total += element.cantComprar * element.precio;
      }
      if(element.idComisionista !== undefined){
        precComisionista = element.precio;
      }
    });
    return total+precComisionista;
  }

  
  agregarComisionista() {
    if(this.comisionistaAnterior!== null){
      console.log(this.comisionistaAnterior)
      this.delete(this.comisionistaAnterior);
    }
    let com =  {
      idComisionista: this.selectedComisionista._id,
      nombre: this.selectedComisionista.nombre,
      precio: this.selectedComisionista.precio,
      descripcion: '',
      stock: 1
    }    
    this.comisionistaAnterior = com;
    this.list.push(com);

    this.precioFinal();
  }

  selectedComisionista = this.comisionistas[0];

}
