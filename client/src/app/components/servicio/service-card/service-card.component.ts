import { Component, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

import { ServicesService } from 'src/app/services/servicio.service';

import { Servicio } from 'src/app/models/Servicio';

declare var $: any;

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent {

  @Output() seleccionarCategoria = new EventEmitter();

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

  serviceDetailQuery: any;
  serviceDetailSubscription: any;

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.serviceDetailSubscription) this.unsuscribeServiceDetail();
  }

  suscribeServiceDetail(): void {
    this.serviceDetailQuery = this.servicesService.serviceDetail(this.cardData._id || '');
    this.serviceDetailSubscription = this.serviceDetailQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.detalleServicio;
      })
    ).subscribe(
      (res: any) => {
        this.cardData.descripcion = res.descripcion;
        this.cardData.fechaHoraPublicacion = new Date(res.fechaHoraPublicacion!);
        this.cardData.usuario!.nombreApellido = res.usuario.nombreApellido;
        this.cardData.usuario!.email = res.usuario.email;
        this.cardData.usuario!.nivel = { nro: res.usuario.nivel.nro };
      },
      (err: any) => console.log(err)
    );
  }

  refreshServiceDetail(): void {
    this.serviceDetailQuery.refetch();
  }

  unsuscribeServiceDetail(): void {
    this.serviceDetailSubscription.unsubscribe();
  }

  mostrarDetalle(e: any) {
    e.preventDefault();

    if (this.serviceDetailSubscription) {
      this.refreshServiceDetail();
    } else {
      this.suscribeServiceDetail();
    }

    const id = "#" + this.cardData._id;
    $(id).modal("show");
  }

  selectCat(e: any) {
    e.preventDefault();
    this.seleccionarCategoria.emit();
  }
}
