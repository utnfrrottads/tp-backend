import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

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

}
