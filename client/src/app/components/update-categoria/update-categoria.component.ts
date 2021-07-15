import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.scss']
})
export class UpdateCategoriaComponent implements OnInit {

  errorMessage = '';

  categoria: Categoria = {
    descripcion: ''
  }

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  guardar() {
    return;
  }

}
