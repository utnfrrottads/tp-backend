import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

import { Categoria } from 'src/app/models/Categoria';

declare var $: any;

@Component({
  selector: 'app-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss'],
})
export class ServicesSidebarComponent implements OnInit {

  @Output() buscarServiciosPorBusqueda = new EventEmitter<String>();
  @Output() buscarServiciosPorCategorias = new EventEmitter();

  @Input() categorias: Categoria[] = [];

  busqueda: String = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  }

  publicarServicio(): void {
    $('#publicarServicioPopup').modal('show');
  }

  buscar() {
    if (this.busqueda) {
      this.categorias.forEach(categoria => {
        categoria.seleccionada = false;
      });
      this.buscarServiciosPorBusqueda.emit(this.busqueda);
    }
  }

  filtrar() {
    this.busqueda = '';
    this.buscarServiciosPorCategorias.emit();
  }
  
}
