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

  constructor(private router: Router) {}

  @HostListener('window:resize', [])
  public onResize() {
    this.detectScreenSize();
  }
  detectScreenSize() {
    const width = window.innerWidth;
    if (width <= 1130) {
      this.nav_string = 'Buscar';
    } else {
      this.nav_string = '¡Busca un producto!';
    }
  }

  ngOnInit(): void {
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
  loggedIn() {
    if (localStorage.getItem('user') == null) {
      return false;
    } else {
      return true;
    }
  }
  itemsOnStorage() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito == null) {
      return 0;
    } else {
      return carrito.length;
    }
  }
}
