import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Producto } from '../../model/productos';
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

  @Input() lista: Producto[];

  constructor() {}

  @HostListener('window:resize', [])
  public onResize() {
    this.detectScreenSize();
  }
  detectScreenSize() {
    const width = window.innerWidth;
    if(width<=380){
      this.nav_string = "Buscar"
    }
    else{
      this.nav_string = '¡Buscar un producto!';
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
}
