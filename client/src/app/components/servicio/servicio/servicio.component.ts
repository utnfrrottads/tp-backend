import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ServicioService } from 'src/app/services/servicio.service';

import { Servicio } from 'src/app/models/Servicio';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio = {
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
      fotoPerfil: '',
      nivel: {
        _id: '',
        nro: 0,
      }
    },
  };

  cloudinary_url = environment.CLOUDINARY_URL;

  servicioQuery: any;
  servicioSubscription: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private servicioService: ServicioService
  ) { }

  ngOnInit(): void {
    this.suscribeServicio();
  }

  ngOnDestroy(): void {
    if (this.servicioSubscription) this.unsuscribeServicio();
  }

  suscribeServicio(): void {
    this.servicioQuery = this.servicioService.servicio(this.rutaActiva.snapshot.params.idServicio);
    this.servicioSubscription = this.servicioQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.servicio;
      })
    ).subscribe(
      (res: any) => {
        res.fechaHoraPublicacion = new Date(res.fechaHoraPublicacion);
        this.servicio = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServicio(): void {
    this.servicioQuery.refetch();
  }

  unsuscribeServicio(): void {
    this.servicioSubscription.unsubscribe();
  }

}
