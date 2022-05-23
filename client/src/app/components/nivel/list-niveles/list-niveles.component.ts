import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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
  nivelSuperior?: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };

  niveles: Nivel[] = [];

  nivelesQuery: any;
  nivelesSubscription: any;

  constructor(private nivelService: NivelService) { }

  ngOnInit(): void {
    this.suscribeNiveles();
  }

  ngOnDestroy(): void {
    this.unsuscribeNiveles();
  }

  suscribeNiveles(): void {
    this.nivelesQuery = this.nivelService.niveles();
    this.nivelesSubscription = this.nivelesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.niveles;
      })
    ).subscribe(
      (res: any) => {
        this.niveles = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshNiveles(): void {
    this.nivelesQuery.refetch();
  }

  unsuscribeNiveles(): void {
    this.nivelesSubscription.unsubscribe();
  }

  abrirModalAgregarNivel() {
    this.editMode = false;
    this.nivelEditando = 0;

    if (this.niveles.length > 0) {
      this.editarContratosMinimos = true;
      this.nivel = {
        _id: '',
        nro: ((this.niveles[this.niveles.length - 1]).nro || 0) + 1,
        contratosMinimos: ((this.niveles[this.niveles.length - 1]).contratosMinimos || 0) + 1
      };
      this.nivelInferior = {
        _id: '',
        nro: (this.niveles[this.niveles.length - 1]).nro,
        contratosMinimos: (this.niveles[this.niveles.length - 1]).contratosMinimos
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
    this.nivelSuperior = undefined;
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
    if ((nivel.nro || 0) > 1) {
      this.nivelInferior = {
        _id: '',
        nro: (this.niveles[(nivel.nro || 0) - 2]).nro,
        contratosMinimos: (this.niveles[(nivel.nro || 0) - 2]).contratosMinimos
      };
    } else {
      this.nivelInferior = {
        _id: '',
        nro: 0,
        contratosMinimos: 0
      };
    }
    if (this.niveles[this.niveles.length - 1].nro === nivel.nro) {
      this.nivelSuperior = undefined;
    } else {
      this.nivelSuperior = {
        _id: '',
        nro: (this.niveles[nivel.nro || 0]).nro,
        contratosMinimos: (this.niveles[nivel.nro || 0]).contratosMinimos
      };
    }
    $("#updateNivelPopup").modal("show");
  }

  eliminarNivel(_id: String) {
    this.nivelService.deleteNivel(_id).subscribe(
      () => {
        this.refreshNiveles();
      },
      (err: any) => console.log(err)
    )
  }
}
