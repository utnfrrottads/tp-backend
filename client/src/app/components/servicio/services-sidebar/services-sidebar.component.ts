import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';

declare var $: any;

@Component({
  selector: 'app-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss'],
})
export class ServicesSidebarComponent implements OnInit {

  @Output() buscarServiciosPorBusqueda = new EventEmitter<String>();

  @Input() categorias: Categoria[] = [];

  busqueda: String = '';

  constructor() {}

  ngOnInit(): void {
  }

  publicarServicio(): void {
    $('#publicarServicioPopup').modal('show');
  }

  buscar() {
    if (this.busqueda) this.buscarServiciosPorBusqueda.emit(this.busqueda);
  }
  
}
