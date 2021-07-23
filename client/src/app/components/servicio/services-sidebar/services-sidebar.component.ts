import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

declare var $: any;

@Component({
  selector: 'app-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss'],
})
export class ServicesSidebarComponent implements OnInit {

  @Input() categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
  }

  publicarServicio(): void {
    $('#publicarServicioPopup').modal('show');
  }
  
}
