import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ContratoService } from 'src/app/services/contrato.service';

import { Servicio } from 'src/app/models/Servicio';
import { Contrato } from 'src/app/models/Contrato';
import { Estado } from 'src/app/enums';

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

  serviciosContratadosQuery: any;
  serviciosContratadosSubscription: any;

  contratos: Contrato[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    public userService: UserService,
    private servicioService: ServicioService,
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
    this.subscribeServiciosContratados();
  }

  ngOnDestroy(): void {
    if (this.serviceDetailSubscription) this.unsuscribeServiceDetail();
    if (this.serviciosContratadosSubscription) this.unsubscribeServiciosContratados();
  }

  suscribeServiceDetail(): void {
    this.serviceDetailQuery = this.servicioService.serviceDetail(this.cardData._id || '');
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
    e.stopPropagation();

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
    e.stopPropagation();

    this.seleccionarCategoria.emit();
  }

  subscribeServiciosContratados(): void {
    this.serviciosContratadosQuery = this.contratoService.serviciosContratados();
    this.serviciosContratadosSubscription = this.serviciosContratadosQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.serviciosContratados;
      })
    ).subscribe(
      (contratos: Contrato[]) => {
        contratos.forEach(contrato => {
          if (contrato.fechaCancelacion) {
            contrato.fechaCancelacion = new Date(contrato.fechaCancelacion);
          }
        });
        this.contratos = contratos;
      },
      (err: any) => console.log(err)
    );
  }

  unsubscribeServiciosContratados() {
    this.serviciosContratadosSubscription.unsubscribe();
  }

  checkSignedContracts(): boolean {
    var canSign = true;
    if (this.contratos.length > 0) {
      this.contratos.forEach(contrato => {
        if (contrato.servicio?._id === this.cardData._id && contrato.estado != Estado.cancelado && contrato.estado != Estado.finalizado) {
          canSign = false;
        }
      });
    }
    return canSign;
  }

  realizarContrato(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this.checkSignedContracts()) {
      this.contratoService.signContract(this.cardData._id!).subscribe(
        () => {
          this.router.navigate(['/serviciosContratados']);
        },
        (err: any) => {
          console.log(err.message);
        }
      );
    } else {
      $('#alertDialog').modal('show');
    }
    
  }

  irAlServicio(e: any) {
    this.router.navigate(['/servicio/' + this.cardData._id]);
  }

}
