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
  nivel: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };
  nivelEditando: Number = 0;

  niveles: Nivel[] = [];

  constructor(private nivelService: NivelService) { }

  ngOnInit(): void {
    this.getNiveles();
  }

  getNiveles() {
    this.nivelService.niveles().subscribe(
      (res: any) => {
        this.niveles = res;
      },
      (err: any) => console.log(err)
    )
  }

  abrirModalAgregarNivel() {
    this.editMode = false;
    this.nivel = {
      _id: '',
      nro: 0,
      contratosMinimos: 0
    };
    this.nivelEditando = 0;
    $("#updateCategoriaPopup").modal("show");
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
    this.nivel = {
      _id: nivel._id,
      nro: nivel.nro,
      contratosMinimos: nivel.contratosMinimos
    };
    this.nivelEditando = nivel.nro || 0;
    $("#updateCategoriaPopup").modal("show");
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
