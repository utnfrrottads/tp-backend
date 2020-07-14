import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  list = [];
  constructor() {}

  ngOnInit(): void {
    //creo una lista para probar.
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
          'Rapido, caro. Mejor que un Iphone. voy a usar esto para rellenar con un texto largo para ver si funciona esto de truncar el texto a partir de la 3ra linea.. asi que voy a rellenar con la cancion de marolio, le da sabor a tu vida, marolio',
        stock: 3,
      },
      {
        idProducto: 2,
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
    ];
    // copie y pegue la del campi
  }
}
