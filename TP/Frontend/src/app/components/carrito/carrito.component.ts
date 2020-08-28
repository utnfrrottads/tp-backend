import { Component, OnInit } from '@angular/core';
import { ComisionistasService } from '../../services/comisionistas.service';

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
    private comisionistasService: ComisionistasService
    ) {}

  ngOnInit(): void {
    this.comisionistasService.getComisionistas()
    .subscribe((res)=>{
      this.comisionistas = res;
    })

    this.list = [
      {
        idProducto: 3,
        idRubro: 2,
        idEmpresa: 1,
        nombre: 'PS4 con Call of Duty Black Ops incluido',
        imagen:
          'https://http2.mlstatic.com/D_NQ_NP_2X_743314-MLA40175756183_122019-F.webp  ',
        precio: 17999,
        descripcion:
          'Tremenda para vicear, pero hasta ahí nomas. No tiene mas potencia que un i5, pero sale el triple',
        stock: 3,
      },
      {
        idProducto: 3,
        idRubro: 2,
        idEmpresa: 1,
        nombre: 'Samsung Galaxy S69 - Funda platino - 99 GB RAM',
        imagen:
          'https://cnet1.cbsistatic.com/img/_RKt08nA2AkU4hgTJHtoOwsuKAI=/980x0/2020/05/02/f7bad802-c8c5-4a3d-8977-d5848a515c48/galaxy-a51.jpg',
        precio: 32199,
        descripcion:
          'Telefono completo. Viene con funda de platino, bañada con diamantes sacados del machupichu/peru. Lo sacamos a la fuerza entrando con una escavadora y atropellando 30 peruanos. El gerente termino preso ',
        stock: 3,
      },
      {
        idProducto: 4,
        idRubro: 2,
        idEmpresa: 1,
        nombre: 'Bicicleta para hacer Modelos del dominio',
        imagen:
          'https://http2.mlstatic.com/mountain-bike-top-mega-rodado26-modelo-rowen-envios-gratis-D_NQ_NP_947011-MLA40463784361_012020-F.webp',
        precio: 17888,
        descripcion:
          'Bicicleta para tomar examen en la UTN FRRo: Materia ADES. Caes con esta al aula y decis que sos la profesora',
        stock: 3,
      },
      {
        idProducto: 5,
        idRubro: 2,
        idEmpresa: 1,
        nombre: 'Procesador Ryzen 7 1800x',
        imagen:
          'https://http2.mlstatic.com/mountain-bike-top-mega-rodado26-modelo-rowen-envios-gratis-D_NQ_NP_947011-MLA40463784361_012020-F.webp',
        precio: 17888,
          descripcion: 'Una bestia, lo tengo overclockeado a 3.9 GHZ, podria un poco mas, pero se me calienta demasiado jajaj salu2. En el red dead redemption 2 no llega ni al 40% del uso, en parte porque es potente, y otra parte porque esta optimizado como el orto. Eso si, la tarjeta de video me explota. Un saludo',
        stock: 3,
      },
    ];

    //a cada elemento de la lista le agrego una cantidad para comprar
    //por defecto será 1.
    this.list.forEach((element) => {
      element.cantComprar = 1;
    });
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
