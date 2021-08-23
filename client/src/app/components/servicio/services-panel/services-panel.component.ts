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
  servicesBySearchQuery: any;
  servicesBySearchSubscription: any;
  servicesByCategoriesQuery: any;
  servicesByCategoriesSubscription: any;
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
    this.unsuscribeServicesBySearch();
    this.unsuscribeServicesByCategories();
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

  suscribeServicesByCategories(): void {
    this.servicesByCategoriesQuery = this.servicesService.servicesByCategories(this.categorias);
    this.servicesByCategoriesSubscription = this.servicesByCategoriesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.serviciosPorCategorias;
      })
    ).subscribe(
      (res: any) => {
        this.servicios = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServicesByCategories(): void {
    this.servicesByCategoriesQuery.refetch();
  }

  unsuscribeServicesByCategories(): void {
    this.servicesByCategoriesSubscription.unsubscribe();
  }

  suscribeServicesBySearch(busqueda: String): void {
    this.servicesBySearchQuery = this.servicesService.servicesBySearch(busqueda);
    this.servicesBySearchSubscription = this.servicesBySearchQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.serviciosPorBusqueda;
      })
    ).subscribe(
      (res: any) => {
        this.servicios = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServicesBySearch(): void {
    this.servicesBySearchQuery.refetch();
  }

  unsuscribeServicesBySearch(): void {
    this.servicesBySearchSubscription.unsubscribe();
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

  buscarServiciosPorBusqueda(busqueda: String) {
    this.suscribeServicesBySearch(busqueda);
  }

  buscarServiciosPorCategorias() {
    this.suscribeServicesByCategories();
  }
  
}
