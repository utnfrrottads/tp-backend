import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
import { Moneda } from 'src/app/models/Moneda';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-services-panel',
  templateUrl: './services-panel.component.html',
  styleUrls: ['./services-panel.component.scss'],
})
export class ServicesPanelComponent implements OnInit {

  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  monedas: Moneda[] = [];

  constructor(
    private servicesService: ServicesService,
    private categoriasService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.getServices();
    this.monedas = JSON.parse(localStorage.getItem('monedas') || '');
    this.getCategorias();
  }

  getServices(): void {
    this.servicesService.services().subscribe(
      (res: any) => {
        this.servicios = res;
      },
      (err: any) => console.log(err)
    );
  }

  getCategorias(): void {
    this.categoriasService.categorias().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }
}
