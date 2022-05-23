import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CategoriaService } from '../../../services/categoria.service';

import { Categoria } from '../../../models/Categoria';

declare var $: any;

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.scss'],
})
export class ListCategoriasComponent implements OnInit {
  editMode: Boolean = false;
  categoria: Categoria = {
    _id: '',
    descripcion: '',
  };
  categoriaEditando: String = '';

  categorias: Categoria[] = [];

  categoriasQuery: any;
  categoriasSubscription: any;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    this.unsuscribeCategorias();
  }

  suscribeCategorias(): void {
    this.categoriasQuery = this.categoriaService.categorias();
    this.categoriasSubscription = this.categoriasQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.categorias;
      })
    ).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshCategorias(): void {
    this.categoriasQuery.refetch();
  }

  unsuscribeCategorias(): void {
    this.categoriasSubscription.unsubscribe();
  }

  abrirModalAgregarCategoria() {
    this.editMode = false;
    this.categoria = {
      _id: '',
      descripcion: '',
    };
    this.categoriaEditando = '';
    $('#updateCategoriaPopup').modal('show');
  }

  abrirModalEliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Eliminar categoría',
      text:
        '¿Seguro desea eliminar la categoría: ' + categoria.descripcion + '?',
      showDenyButton: true,
      denyButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: false,
    }).then((result) => {
      if (result.isDenied) {
        this.eliminarCategoria(categoria._id || '');
      }
    });
  }

  abrirModalEditarCategoria(categoria: Categoria) {
    this.editMode = true;
    this.categoria = {
      _id: categoria._id,
      descripcion: categoria.descripcion,
    };
    this.categoriaEditando = categoria.descripcion || '';
    $('#updateCategoriaPopup').modal('show');
  }

  eliminarCategoria(_id: String) {
    this.categoriaService.deleteCategoria(_id).subscribe(
      () => {
        this.refreshCategorias();
      },
      (err: any) => console.log(err)
    );
  }
}
