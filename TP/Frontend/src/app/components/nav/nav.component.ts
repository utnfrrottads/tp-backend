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
  navString = '';
  ventas = 'ventas';
  compras = 'compras';

  constructor(
    private router: Router,
    private userService: UserService,
    private ventaService: VentasService
  ) {}

  @HostListener('window:resize', [])
  public onResize(): void {
    this.detectScreenSize();
  }
  detectScreenSize(): void {
    const width = window.innerWidth;
    if (width <= 1130) {
      this.navString = 'Buscar';
    } else {
      this.navString = '¡Busca un producto!';
    }
  }

  ngOnInit(): void {
    this.detectScreenSize();
    this.elems = document.querySelectorAll('.dropdown-trigger');
    this.instances = M.Dropdown.init(this.elems, this.options);
  }
  search(input): any {
    const texto = input.value;
    console.log(texto);
    if (texto === '') {
      window.alert('Por favor ingrese una descripción de lo que desea comprar');
      return;
    } else {
      input.value = '';
      this.router.navigate(['/rubros/productos/search', texto]);
    }
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  loggedIn(): boolean {
    if (this.userService.getLocalUser() == null) {
      return false;
    } else {
      return true;
    }
  }
  itemsOnStorage(): any {
    const carrito = this.ventaService.getCart();
    if (carrito == null) {
      return 0;
    } else {
      return carrito.length;
    }
  }
}
