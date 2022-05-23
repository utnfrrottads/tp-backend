import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Servicio } from 'src/app/models/Servicio';

declare var $: any;

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  @Input() servicio: Servicio = {
    _id: '',
    titulo: '',
    descripcion: '',
    precio: {
      valor: 0,
      moneda: {
        tag: ''
      }
    },
    ubicacion: '',
    fechaHoraPublicacion: undefined,
    categoria: {
      _id: '',
      descripcion: '',
    },
    usuario: {
      _id: '',
      nombreUsuario: '',
      nombreApellido: '',
      email: '',
      nivel: {
        _id: '',
        nro: 0,
      }
    },
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verPerfil(e: any) {
    e.preventDefault();

    const id = "#" + this.servicio._id;
    $(id).modal("hide");

    this.router.navigate(['perfil/' + this.servicio.usuario?.nombreUsuario]);
  }

}
