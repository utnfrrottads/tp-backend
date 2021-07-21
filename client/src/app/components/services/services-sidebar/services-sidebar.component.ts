import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
declare var $: any;

@Component({
  selector: 'app-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss'],
})
export class ServicesSidebarComponent implements OnInit {
  @Output() abrirModalPublicarServicio = new EventEmitter();

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  publicarServicio(): void {
    // this.abrirModalPublicarServicio.emit();
    $('#publicarServicioPopup').modal('show');
  }

  getCategorias(): void {
    this.categoriaService.categorias().subscribe(
      (res: any) => {
        this.categorias = res;
        console.log(this.categorias);
      },
      (err: any) => console.log(err)
    );
  }
}
