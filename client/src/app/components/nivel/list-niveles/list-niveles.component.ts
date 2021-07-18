import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { NivelService } from '../../../services/nivel.service';

import { Nivel } from '../../../models/Nivel';

declare var $: any;

@Component({
  selector: 'app-list-niveles',
  templateUrl: './list-niveles.component.html',
  styleUrls: ['./list-niveles.component.scss']
})
export class ListNivelesComponent implements OnInit {

  editMode: Boolean = false;
  nivelEditando: Number = 0;
  editarContratosMinimos: Boolean = true;
  nivel: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };
  nivelInferior: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };
  nivelSuperior: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };

  niveles: Nivel[] = [];

  constructor(private nivelService: NivelService) { }

  ngOnInit(): void {
    this.getNiveles();
  }

  getNiveles() {
    this.nivelService.niveles().subscribe(
      (res: any) => {
        this.niveles = res.sort(function (a: any, b: any) {
          if (a.nro < b.nro) {
            return -1;
          }
          if (a.nro > b.nro) {
            return 1;
          }
          return 0;
        });
      },
      (err: any) => console.log(err)
    )
  }

  abrirModalAgregarNivel() {
    this.editMode = false;
    this.nivelEditando = 0;

    if (this.niveles.length > 0) {
      let nroMax = 0;
      let contratosMax = 0;
      for (let i = 0, len = this.niveles.length; i < len; i++) {
        if (nroMax < (this.niveles[i].nro || 0)) {
          nroMax = this.niveles[i].nro || 0;
          contratosMax = this.niveles[i].contratosMinimos || 0;
        }
      }

      this.editarContratosMinimos = true;
      this.nivel = {
        _id: '',
        nro: nroMax + 1,
        contratosMinimos: contratosMax + 1
      };
      this.nivelInferior = {
        _id: '',
        nro: nroMax,
        contratosMinimos: contratosMax
      };
    } else {
      this.editarContratosMinimos = false;
      this.nivel = {
        _id: '',
        nro: 1,
        contratosMinimos: 0
      };
      this.nivelInferior = {
        _id: '',
        nro: 0,
        contratosMinimos: 0
      }
    }
    this.nivelSuperior = {
      _id: '',
      nro: 0,
      contratosMinimos: 0
    };
    $("#updateNivelPopup").modal("show");
  }

  abrirModalEliminarNivel(nivel: Nivel) {
    Swal.fire({
      title: "Eliminar nivel",
      text:
        "¿Seguro desea eliminar el nivel: " + nivel.nro?.toString() + "?",
      showDenyButton: true,
      denyButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: false
    }).then(result => {
      if (result.isDenied) {
        this.eliminarNivel(nivel._id || '');
      }
    })
  }

  abrirModalEditarNivel(nivel: Nivel) {
    this.editMode = true;
    this.nivelEditando = nivel.nro || 0;
    this.editarContratosMinimos = true;
    this.nivel = {
      _id: nivel._id,
      nro: nivel.nro,
      contratosMinimos: nivel.contratosMinimos
    };
    this.nivelInferior = {
      _id: '',
      nro: (this.niveles[nivel.nro || 0 - 2]).nro,
      contratosMinimos: (this.niveles[nivel.nro || 0 - 2]).contratosMinimos
    };
    this.nivelSuperior = {
      _id: '',
      nro: (this.niveles[nivel.nro || 0]).nro,
      contratosMinimos: (this.niveles[nivel.nro || 0]).contratosMinimos
    };
    $("#updateNivelPopup").modal("show");
  }

  eliminarNivel(_id: String) {
    this.nivelService.deleteNivel(_id).subscribe(
      () => {
        this.getNiveles();
      },
      (err: any) => console.log(err)
    )
  }
}
