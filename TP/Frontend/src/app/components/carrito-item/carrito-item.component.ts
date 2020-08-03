import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.scss'],
})
export class CarritoItemComponent implements OnInit {


  @Input() producto: any;
  public cantProd = 1;
  

  constructor() {}

  ngOnInit(): void {

  }
}
