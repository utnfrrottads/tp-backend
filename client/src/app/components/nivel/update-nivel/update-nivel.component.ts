import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { NivelService } from '../../../services/nivel.service';

import { Nivel } from '../../../models/Nivel';

declare var $: any;

@Component({
  selector: 'app-update-nivel',
  templateUrl: './update-nivel.component.html',
  styleUrls: ['./update-nivel.component.scss'],
})
export class UpdateNivelComponent implements OnInit {
  @Output() getNiveles = new EventEmitter();

  @Input() editMode: Boolean = false;
  @Input() nivelEditando: Number = 0;
  @Input() editarContratosMinimos: Boolean = true;
  @Input() nivel: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0,
  };
  @Input() nivelInferior: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0,
  };
  @Input() nivelSuperior?: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0,
  };

  errorMessage = '';

  constructor(private nivelService: NivelService) {}

  ngOnInit(): void {}

  guardar(event: any) {
    event.preventDefault();
    if (this.editMode) {
      this.editarNivel(this.nivel);
    } else {
      this.agregarNivel(this.nivel);
    }
  }

  agregarNivel(nivel: Nivel) {
    this.nivelService.addNivel(nivel).subscribe(
      () => {
        this.errorMessage = '';
        this.getNiveles.emit();
        $('#updateNivelPopup').modal('hide');
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }

  editarNivel(nivel: Nivel) {
    this.nivelService.updateNivel(nivel).subscribe(
      () => {
        this.errorMessage = '';
        this.getNiveles.emit();
        $('#updateNivelPopup').modal('hide');
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
