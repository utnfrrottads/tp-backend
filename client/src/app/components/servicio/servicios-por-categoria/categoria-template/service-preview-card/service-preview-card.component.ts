import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/Servicio'

import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-service-preview-card',
  templateUrl: './service-preview-card.component.html',
  styleUrls: ['./service-preview-card.component.scss']
})
export class ServicePreviewCardComponent implements OnInit {

  @Input() cardData: Servicio = {
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

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  irAlServicio(e: any) {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/servicio/' + this.cardData._id]);
    } else {
      // Show Alert
    }
  }
}
