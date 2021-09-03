import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { UserService } from 'src/app/services/user.service';

import { Servicio } from 'src/app/models/Servicio';
import { Contrato } from 'src/app/models/Contrato';

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
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
    this.suscribeServicio();
  }

  ngOnDestroy(): void {
    if (this.servicioSubscription) this.unsuscribeServicio();
    if (this.contratosRealizadosSubscription) this.unsuscribeContratosRealizados();
    if (this.contratosRecibidosSubscription) this.unsuscribeContratosRecibidos();
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
        res.forEach(cont => {
          cont.fecha = new Date(cont.fecha!);
          if (cont.fechaCancelacion) cont.fechaCancelacion = new Date(cont.fechaCancelacion!);
        });
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

}
