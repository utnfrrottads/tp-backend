import { Component, OnInit, Input } from '@angular/core';
import {Producto} from '../../model/productos'
declare var M:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  
  elems:any;
  instances:any;
  options = [];

  @Input() lista:Producto[];


  constructor() { }
  
  ngOnInit(): void {
    this.elems = document.querySelectorAll('.dropdown-trigger');
    this.instances = M.Dropdown.init(this.elems, this.options);
  }
  search(input)
  {
    console.log("Se ha buscado un producto usando la palabra:" + input.value);
    input.value = "";
  }

}
