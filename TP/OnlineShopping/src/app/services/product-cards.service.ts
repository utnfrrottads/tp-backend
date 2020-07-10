import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCardsService {
  list = [];

  constructor() { 

  }
  getProducts(idRubroBuscado){
  //acá debería llamar a un procedimiento que recupere de la BD
  this.list = [{  idProducto: 1, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Notebook", imagen: "https://http2.mlstatic.com/notebook-lenovo-i3-8130u-4gb-1tb-156-pulgadas-dvdrw-D_NQ_NP_872956-MLA42418883269_062020-F.webp", precio: 50000,  descripcion: "Es una notebook, un producto muy bueno y de alta calidad.", stock: 25 },
          {  idProducto: 2, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Bicicleta", imagen: "https://http2.mlstatic.com/mountain-bike-top-mega-rodado26-modelo-rowen-envios-gratis-D_NQ_NP_947011-MLA40463784361_012020-F.webp", precio: 5000,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 3, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Celular", imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_673519-MLA41812240411_052020-F.webp", precio: 21000,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 3, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Consola de videojuegos zarpada", imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_743314-MLA40175756183_122019-F.webp  ", precio: 17999, descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 1, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Notebook", imagen: "https://http2.mlstatic.com/notebook-intel-cloudbook-4gb-64gb-enova-windows-cuotas-D_NQ_NP_978770-MLA42361518173_062020-F.webp", precio: 53200,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 2, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Bicicleta", imagen: "https://http2.mlstatic.com/mountain-bike-rodado-26-neptune-topmega-envios-gratis--D_NQ_NP_979529-MLA40849435663_022020-F.webp", precio: 25000,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 3, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Celular", imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_916515-MLA31002756138_062019-F.webp", precio: 32199,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 2, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Bicicleta", imagen: "https://http2.mlstatic.com/mountain-bike-rodado-26-neptune-topmega-envios-gratis--D_NQ_NP_979529-MLA40849435663_022020-F.webp", precio: 15000,  descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 2, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Bicicleta", imagen: "https://http2.mlstatic.com/bicicleta-mountain-bike-rodado-26-doble-suspension-forest-cuadro-y-llantas-reforzados-cambios-colores-happy-buy-D_NQ_NP_744114-MLA32928926620_112019-F.webp",  precio: 25000, descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 3, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Celular", imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_673519-MLA41812240411_052020-F.webp",  precio: 35000, descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },
          {  idProducto: 2, idRubro: idRubroBuscado,  idEmpresa: 1, nombre: "Bicicleta", imagen: "https://http2.mlstatic.com/mountain-bike-top-mega-rodado26-modelo-rowen-envios-gratis-D_NQ_NP_947011-MLA40463784361_012020-F.webp",  precio: 17888, descripcion: "Es una bicicleta super rápida, para andar a altas velocidades.", stock: 3 },

        ]

  return this.list;
  }


}
