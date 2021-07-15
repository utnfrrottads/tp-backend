import { Component, OnInit, Input  } from '@angular/core';

import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/Categoria';

declare var $: any;

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.scss']
})
export class UpdateCategoriaComponent implements OnInit {

  @Input() editMode: Boolean = false;
  @Input() categoria: Categoria = {
    _id: '',
    descripcion: ''
  };

  errorMessage = '';

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  guardar() {
    if (this.editMode) {
      this.editarCategoria(this.categoria);
    } else {
      this.agregarCategoria(this.categoria);
    }
  }

  agregarCategoria(categoria: Categoria) {
    this.categoriaService.addCategoria(categoria).subscribe(
      () => {
        $("#updateCategoriaPopup").modal("hide");
      },
      (err: any) => console.log(err)
    )
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaService.updateCategoria(categoria).subscribe(
      () => {
        $("#updateCategoriaPopup").modal("hide");
      },
      (err: any) => console.log(err)
    )
  }

}
