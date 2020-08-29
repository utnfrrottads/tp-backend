import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Producto } from '../../model/productos';
import { Router } from '@angular/router';
import { ProductCardsService } from 'src/app/services/product-cards.service';
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

  constructor(private router: Router, private service: ProductCardsService) {}

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
    }
    else{
      this.router.navigate(['/rubros/productos/search',texto]);
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
