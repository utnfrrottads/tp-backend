import { Component, OnInit } from '@angular/core';
import { Producto } from '../app/model/productos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OnlineShopping';
  lista: any = [];

  ngOnInit() {
    
    for (let i = 0; i < 10; i++) {
      let p = new Producto();
      p.idEmpresa = 123;
      p.descripcion = 'Ryzen 7 1800x. Procesador 8 nucleos 16 hilos.';
      p.idProducto = 1;
      p.idRubro = 20;
      p.stock = 400;
      this.lista.push(p);
    }

  }

  getLista() {}
}
