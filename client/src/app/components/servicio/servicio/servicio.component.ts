import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { UserService } from 'src/app/services/user.service';

import { Servicio } from 'src/app/models/Servicio';
import { Contrato } from 'src/app/models/Contrato';

import Swal from 'sweetalert2';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Estado } from 'src/app/enums';

declare var $: any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  score?: number;

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
  notificacionQuery: any;
  notificacionSubscription: any;

  contratos: Contrato[] = [];

  contratosRealizadosQuery: any;
  contratosRealizadosSubscription: any;
  contratosRecibidosQuery: any;
  contratosRecibidosSubscription: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    private servicioService: ServicioService,
    private contratoService: ContratoService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    /*if (this.rutaActiva.snapshot.queryParams.registrado) {
      Swal.fire({
        title: '¡Servicio publicado!',
        text:
          'El servicio se registró correctamente',
      });
    }*/

    this.suscribeServicio();

    if (this.authService.loggedIn() && this.rutaActiva.snapshot.params.idNotificacion) {
      this.notificacionQuery = this.notificacionService.notificacion(this.rutaActiva.snapshot.params.idNotificacion);
      this.notificacionSubscription = this.notificacionQuery.valueChanges.pipe(
        map((res: any) => {
          return res.data.notificacion;
        })
      ).subscribe(
        (res: any) => {
          if (res.usuario._id == this.userService.getUsuario()._id && !res.abierta) {
            this.openModal();
            this.notificacionService.abrirNotificacion(this.rutaActiva.snapshot.params.idNotificacion || '').subscribe();
          }
        },
        (err: any) => console.log(err)
      );
    }
  }

  ngOnDestroy(): void {
    if (this.servicioSubscription) this.unsuscribeServicio();
    if (this.contratosRealizadosSubscription) this.unsuscribeContratosRealizados();
    if (this.contratosRecibidosSubscription) this.unsuscribeContratosRecibidos();
    if (this.notificacionSubscription) this.notificacionSubscription.unsubscribe();
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

        this.buscarContratos();
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

  suscribeContratosRealizados(): void {
    this.contratosRealizadosQuery = this.contratoService.contratosRealizados(this.servicio._id || '');
    this.contratosRealizadosSubscription = this.contratosRealizadosQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.contratosRealizados;
      })
    ).subscribe(
      (res: Contrato[]) => {
        var contractsDates: number[] = [];
        res.forEach(cont => {
          cont.fecha = new Date(cont.fecha!);
          if (cont.fechaCancelacion) cont.fechaCancelacion = new Date(cont.fechaCancelacion!);
          if (this.score) {
            contractsDates.push(cont.fecha!.getTime());
          }
        });
        if (this.score) {
          var maxDate = Math.max.apply(null, contractsDates);
          let desiredContract = res.find(cont => cont.fecha!.getTime() == maxDate);
          if (desiredContract) {
            this.contratoService.setScore(desiredContract._id || '', this.score).subscribe(
              (response: any) => { },
              (error: any) => { }
            );
          }
        }
        this.contratos = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshContratosRealizados(): void {
    this.contratosRealizadosQuery.refetch();
  }

  unsuscribeContratosRealizados(): void {
    this.contratosRealizadosSubscription.unsubscribe();
  }

  suscribeContratosRecibidos(): void {
    this.contratosRecibidosQuery = this.contratoService.contratosRecibidos(this.servicio._id || '');
    this.contratosRecibidosSubscription = this.contratosRecibidosQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.contratosRecibidos;
      })
    ).subscribe(
      (res: Contrato[]) => {
        res.forEach(cont => {
          cont.fecha = new Date(cont.fecha!);
          if (cont.fechaCancelacion) cont.fechaCancelacion = new Date(cont.fechaCancelacion!);
        });
        this.contratos = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshContratosRecibidos(): void {
    this.contratosRecibidosQuery.refetch();
  }

  unsuscribeContratosRecibidos(): void {
    this.contratosRecibidosSubscription.unsubscribe();
  }

  buscarContratos() {
    if (this.authService.loggedIn()) {
      if (this.userService.getUsuario()._id === this.servicio.usuario?._id) {
        this.suscribeContratosRecibidos();
      } else {
        this.suscribeContratosRealizados();
      }
    }
  }

  openModal() {
    $('#alertDialog').modal('show');
  }

  dismissModal(idModal: String) {
    $('#' + idModal).modal('hide');
  }

  setScore(score: number) {
    this.score = score;
    (this.userService.getUsuario()._id === this.servicio.usuario?._id) ? this.suscribeContratosRecibidos() : this.suscribeContratosRealizados();
  }
}
