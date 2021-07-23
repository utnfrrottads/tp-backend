import { Component, Input } from '@angular/core';
import { Servicio } from 'src/app/models/Servicio';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent {
  
  @Input() cardData: Servicio = {
    _id: '',
    titulo: '',
    descripcion: '',
    categoria: {
      _id: '',
      descripcion: '',
    },
    usuario: {
      _id: '',
      nombreUsuario: '',
    },
  };

  mostrarDetalle(): void {}
}
