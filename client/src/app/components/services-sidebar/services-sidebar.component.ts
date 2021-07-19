import { Component, OnInit } from '@angular/core';
import {Categoria} from 'src/app/models/Categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss']
})
export class ServicesSidebarComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getAll().subscribe(
      (res: any) => {
        this.categorias = res;
        console.log(this.categorias);
      },
      (err: any) => console.log(err)
    );
  }

}
