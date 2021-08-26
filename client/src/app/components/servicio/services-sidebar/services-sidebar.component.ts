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

  @Output() actualizarServicios = new EventEmitter<String>();

  @Input() categorias: Categoria[] = [];
  @Input() busqueda: String = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.changeSizeEvent();
    this.clickAfueraDelServicePanel();
  }

  publicarServicio(): void {
    $('#publicarServicioPopup').modal('show');
  }

  actualizar() {
    this.actualizarServicios.emit(this.busqueda);
  }

  abrirServicePanel() {
    $('#btn-abrir-service-sidebar').css("display", "none");
    $('#services-sidebar-content').css("display", "flex");
  }

  cerrarServicePanel() {
    $('#services-sidebar-content').css("display", "none");
    $('#btn-abrir-service-sidebar').css("display", "flex");
  }

  clickAfueraDelServicePanel() {
    $(document).on("click", function (e: any) {
      const sidebar = $("#services-sidebar-content");
      const btn = $("#btn-abrir-service-sidebar");

      if (
        $(window).width() < 768
        && !sidebar.is(e.target) && sidebar.has(e.target).length === 0
        && !btn.is(e.target) && btn.has(e.target).length === 0
        ) {
        $('#services-sidebar-content').css("display", "none");
        $('#btn-abrir-service-sidebar').css("display", "flex");
      }
    });
  }

  changeSizeEvent() {
    var anchoAnterior = $(window).width();
    $(window).resize(function () {
      if ($(window).width() >= 768 && anchoAnterior < 768) {
        $('#btn-abrir-service-sidebar').css("display", "none");
        $('#services-sidebar-content').css("display", "flex");
      } else if ($(window).width() < 768 && anchoAnterior >= 768) {
        $('#services-sidebar-content').css("display", "none");
        $('#btn-abrir-service-sidebar').css("display", "flex");
      }

      anchoAnterior = $(window).width();
    });
  }

}
