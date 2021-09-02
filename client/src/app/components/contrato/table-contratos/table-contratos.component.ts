import { Component, Input, OnInit } from '@angular/core';

import { ContratoService } from 'src/app/services/contrato.service';

import { Contrato } from 'src/app/models/Contrato';

@Component({
  selector: 'app-table-contratos',
  templateUrl: './table-contratos.component.html',
  styleUrls: ['./table-contratos.component.scss']
})
export class TableContratosComponent implements OnInit {

  @Input() contratos: Contrato[] = [];
  @Input() title: String = '';
  @Input() msgNoContratos: String = '';

  constructor(private contratoService: ContratoService) { }

  ngOnInit(): void {
  }

  cancelarContrato(e: any, contrato: Contrato) {
    e.preventDefault();

    this.contratoService.cancelContract(contrato._id || '').subscribe(
      (res: any) => {
        const contratoCancelado = res.data.cancelContract;

        contrato.contratoCanceladoPorOferente = contratoCancelado.contratoCanceladoPorOferente;
        contrato.fechaCancelacion = new Date(contratoCancelado.fechaCancelacion);
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  mensajes(e: any) {
    e.preventDefault();
  }

}
