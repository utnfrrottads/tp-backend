import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';

declare var $: any;

@Component({
  selector: 'app-services-panel',
  templateUrl: './services-panel.component.html',
  styleUrls: ['./services-panel.component.scss'],
})
export class ServicesPanelComponent implements OnInit {

  @Output() updateServices = new EventEmitter<String>();
  @Output() selectCategory = new EventEmitter<Servicio>();

  @Input() titulo: String = '';
  @Input() noServicesInfo: String = '';
  @Input() mostrarBtnPublicarServicio: boolean = false;
  @Input() servicios: Servicio[] = [];
  @Input() categorias: Categoria[] = [];
  @Input() busqueda: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  publicarServicio(): void {
    $('#publicarServicioPopup').modal('show');
  }

  actualizarServicios(busqueda: String) {
    this.updateServices.emit(busqueda);
  }

  seleccionarCategoria(serv: Servicio) {
    this.selectCategory.emit(serv);
  }

}
