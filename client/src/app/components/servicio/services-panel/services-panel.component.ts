import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

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

  servicesQuery: any;
  servicesSubscription: any;
  categoriasQuery: any;
  categoriasSubscription: any;

  constructor(
    private servicesService: ServicesService,
    private categoriasService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.suscribeServices();
    this.monedas = JSON.parse(localStorage.getItem('monedas') || '[]');
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    this.unsuscribeServices();
    this.unsuscribeCategorias();
  }

  suscribeServices(): void {
    this.servicesQuery = this.servicesService.services();
    this.servicesSubscription = this.servicesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.servicios;
      })
    ).subscribe(
      (res: any) => {
        this.servicios = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServices(): void {
    this.servicesQuery.refetch();
  }

  unsuscribeServices(): void {
    this.servicesSubscription.unsubscribe();
  }

  suscribeCategorias(): void {
    this.categoriasQuery = this.categoriasService.categorias();
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

  unsuscribeCategorias(): void {
    this.categoriasSubscription.unsubscribe();
  }
  
}
