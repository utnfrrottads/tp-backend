import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/Categoria';

declare var $: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categoria: Categoria = {
    _id: '',
    descripcion: ''
  };

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.categorias().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    )
  }

  abrirModalEliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: "Eliminar categoría",
      text:
        "¿Seguro desea eliminar la categoría: " + categoria.descripcion + "?",
      showDenyButton: true,
      denyButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: false
    }).then(result => {
      if (result.isDenied) {
        this.eliminarCategoria(categoria._id || '');
      }
    })
  }

  eliminarCategoria(_id: String) {
    this.categoriaService.deleteCategoria(_id).subscribe(
      (res: any) => {
        this.getCategorias();
      },
      (err: any) => console.log(err)
    )
  }

}
