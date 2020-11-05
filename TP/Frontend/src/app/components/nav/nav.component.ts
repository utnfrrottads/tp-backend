import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VentasService } from 'src/app/services/ventas.service';
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
  ventas = 'ventas';
  compras = 'compras';

  constructor(
    private router: Router,
    private userService: UserService,
    private ventaService: VentasService
  ) {}

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
    let texto = input.value;
    console.log(texto);
    if (texto === '') {
      window.alert('Por favor ingrese una descripción de lo que desea comprar');
      return;
    } else {
      input.value = '';
      this.router.navigate(['/rubros/productos/search', texto]);
    }
  }

  closeSession() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  loggedIn() {
    if (this.userService.getLocalUser() == null) {
      return false;
    } else {
      return true;
    }
  }
  itemsOnStorage() {
    let carrito = this.ventaService.getCart()
    if (carrito == null) {
      return 0;
    } else {
      return carrito.length;
    }
  }
}
