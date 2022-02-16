import { Component, Input, OnInit } from '@angular/core';

import { ContratoService } from 'src/app/services/contrato.service';

import { Contrato } from 'src/app/models/Contrato';
import { Estado } from 'src/app/enums';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-contratos',
  templateUrl: './table-contratos.component.html',
  styleUrls: ['./table-contratos.component.scss']
})
export class TableContratosComponent implements OnInit {

  @Input() contratos: Contrato[] = [];
  @Input() title: String = '';
  @Input() msgNoContratos: String = '';

  constructor(
    private contratoService: ContratoService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  cancelarContrato(e: any, contrato: Contrato) {
    e.preventDefault();

    this.contratoService.cancelContract(contrato._id || '').subscribe(
      (res: any) => {
        const contratoCancelado = res.data.cancelContract;

        contrato.contratoCanceladoPorOferente = contratoCancelado.contratoCanceladoPorOferente;
        contrato.fechaCancelacion = new Date(contratoCancelado.fechaCancelacion);
        contrato.estado = contratoCancelado.estado;
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  confirmarContrato(e: any, contrato: Contrato) {
    e.preventDefault();

    this.contratoService.confirmContract(contrato._id || '').subscribe(
      (response: any) => {
        const contratoConfirmado = response.data.confirmContract;

        contrato.estado = contratoConfirmado.estado;
      },
      (error: Error) => {
        console.log(error.message);
      }
    )
  }

  finalizarContrato(e: any, contrato: Contrato) {
    e.preventDefault();
    
    this.contratoService.finishContract(contrato._id || '').subscribe(
      (response: any) => {
        const contratoFinalizado = response.data.finishContract;

        contrato.estado = contratoFinalizado.estado;
      },
      (error: Error) => {
        console.log(error.message);
      }
    )
  }

  cancelContractValidation(contrato: Contrato): boolean {
    if (contrato.estado == Estado.contratado  || (contrato.servicio?.usuario?._id === this.userService.getUsuario()._id && contrato.estado == Estado.confirmado)) {
      return true
    }
    return false
  }

  messagesContractValidation(contrato: Contrato): boolean {
    if (contrato.estado == Estado.contratado || contrato.estado == Estado.confirmado) {
      return true
    }
    return false
  }

  confirmContractValidation(contrato: Contrato): boolean {
    if (contrato.estado == Estado.contratado && contrato.servicio?.usuario?._id === this.userService.getUsuario()._id) {
      return true
    }
    return false
  }

  finishContractValidation(contrato: Contrato): boolean {
    if (contrato.estado == Estado.confirmado && contrato.servicio?.usuario?._id === this.userService.getUsuario()._id) {
      return true
    }
    return false
  }
}
