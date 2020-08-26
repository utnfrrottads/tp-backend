import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Producto } from '../../model/productos';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  elems: any;
  instances: any;
  options = [];
  nav_string = '';

  lista: Producto[] = [];

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  public onResize() {
    this.detectScreenSize();
  }
  detectScreenSize() {
    const width = window.innerWidth;
    if (width <= 500) {
      this.nav_string = 'Buscar';
    } else {
      this.nav_string = '¡Busca un producto!';
    }
  }

  ngOnInit(): void {
    //creo una lista de prueba, para testear.
    for (let i = 0; i < 10; i++) {
      let p = new Producto();
      p.idEmpresa = 123;
      p.descripcion = 'Ryzen 7 1800x. Procesador 8 nucleos 16 hilos.';
      p.idProducto = 1;
      p.idRubro = 20;
      p.stock = 400;
      this.lista.push(p);
    }

    this.detectScreenSize();
    this.elems = document.querySelectorAll('.dropdown-trigger');
    this.instances = M.Dropdown.init(this.elems, this.options);
  }
  search(input) {
    let texto = input.value.trim();
    if (texto !== '') {
      console.log('Se ha buscado un producto usando la palabra:' + texto);
      input.value = '';
    }
  }

  CloseSession() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
