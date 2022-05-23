import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { SocketChatService } from 'src/app/services/socket-chat.service';

import { Contrato } from 'src/app/models/Contrato';
import { Mensaje } from 'src/app/models/Mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  contratoCargado: boolean = false;
  contratoCancelado: boolean = false;
  tituloChat: string = '';
  mensajes: Mensaje[] = [];
  mensaje: string = '';

  contratoQuery: any;
  contratoSubscription: any;
  mensajesDelContratoQuery: any;
  mensajesDelContratoSubscription: any;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private socketChat: SocketChatService,
    public userService: UserService,
    private contratoService: ContratoService,
    private mensajeService: MensajeService,
  ) { }

  ngOnInit(): void {
    this.suscribeContrato();
  }

  ngOnDestroy(): void {
    if (this.mensajesDelContratoSubscription) this.unsuscribeMensajesDelContrato();
  }

  suscribeContrato(): void {
    this.contratoQuery = this.contratoService.contrato(this.rutaActiva.snapshot.params.idContrato);
    this.contratoSubscription = this.contratoQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.contrato;
      })
    ).subscribe(
      (res: Contrato) => {
        if (res && (res.usuario?._id == this.userService.getUsuario()._id || res.servicio?.usuario?._id == this.userService.getUsuario()._id)) {
          if (!res.fechaCancelacion) {
            this.contratoCancelado = false;

            this.recibirMensaje();
            this.socketChat.connectToChat(this.rutaActiva.snapshot.params.idContrato);
          } else {
            this.contratoCancelado = true;
          }

          if (res.servicio?.usuario?._id == this.userService.getUsuario()._id) {
            this.tituloChat = 'Usuario: ' + res.usuario?.nombreUsuario + ' - Servicio: ' + res.servicio?.titulo + ' - Fecha Contratación: ' + new Date(res.fecha!).toLocaleDateString();
          } else if (res.usuario?._id == this.userService.getUsuario()._id) {
            this.tituloChat = 'Usuario: ' + res.servicio?.usuario?.nombreUsuario + ' - Servicio: ' + res.servicio?.titulo + ' - Fecha Contratación: ' + new Date(res.fecha!).toLocaleDateString();
          }

          this.suscribeMensajesDelContrato();
          this.contratoCargado = true;
        } else {
          this.router.navigate(['/']);
        }

        this.unsuscribeContrato();
      },
      (err: any) => console.log(err)
    );
  }

  refreshContrato(): void {
    this.contratoQuery.refetch();
  }

  unsuscribeContrato(): void {
    this.contratoSubscription.unsubscribe();
  }

  suscribeMensajesDelContrato(): void {
    this.mensajesDelContratoQuery = this.mensajeService.mensajesDelContrato(this.rutaActiva.snapshot.params.idContrato);
    this.mensajesDelContratoSubscription = this.mensajesDelContratoQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.mensajesDelContrato;
      })
    ).subscribe(
      (res: any) => {
        this.mensajes = res;
        this.mensajesCargados = true;
      },
      (err: any) => console.log(err)
    );
  }

  refreshMensajesDelContrato(): void {
    this.mensajesDelContratoQuery.refetch();
  }

  unsuscribeMensajesDelContrato(): void {
    this.mensajesDelContratoSubscription.unsubscribe();
  }

  enviarMensaje() {
    if (this.contratoCargado && !this.contratoCancelado) {
      this.socketChat.io.emit('sendMessage', this.mensaje);
      this.mensaje = '';
    }
  }

  recibirMensaje() {
    this.socketChat.io.on('receiveMessage', (mensaje: Mensaje) => {
      if (
        (mensaje.mensajeEnviadoPorOferente && mensaje.contrato!.servicio!.usuario!._id == this.userService.getUsuario()._id)
        || (!mensaje.mensajeEnviadoPorOferente && mensaje.contrato!.usuario!._id == this.userService.getUsuario()._id)
      ) this.desplazarChat = true;

      this.mensajes.push(mensaje);
    });
  }

  desplazarChat: boolean = true;
  mensajesCargados: boolean = false;
  altoScrollAnterior: number = $('.body').prop('scrollHeight');
  ngAfterViewChecked(): void {
    if (this.desplazarChat && this.mensajesCargados && this.altoScrollAnterior !== $('.body').prop('scrollHeight')) {
      $('.body').scrollTop($('.body').prop('scrollHeight'));

      this.desplazarChat = false;
      this.altoScrollAnterior = $('.body').prop('scrollHeight');
    }
  }

}
