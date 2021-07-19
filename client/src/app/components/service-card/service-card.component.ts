import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {

  @Input() cardData = {
    idServicio: '',
    titulo: '',
    nombreUsuario: '',
    categoria: '',
    descripcion: ''
  };

  mostrarDetalle(idServicio: string): void {

  }
}
