import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ServicesService } from 'src/app/services/services.service';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
import { Moneda } from 'src/app/models/Moneda';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-servicios-publicados',
  templateUrl: './servicios-publicados.component.html',
  styleUrls: ['./servicios-publicados.component.scss']
})
export class ServiciosPublicadosComponent implements OnInit {

  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  busqueda: String = '';
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
    if (this.servicesSubscription) this.unsuscribeServices();
    if (this.servicesBySearchSubscription) this.unsuscribeServicesBySearch();
    if (this.servicesByCategoriesSubscription) this.unsuscribeServicesByCategories();
    if (this.categoriasSubscription) this.unsuscribeCategorias();
  }

  suscribeServices(): void {
    this.servicesQuery = this.servicesService.myServices();
    this.servicesSubscription = this.servicesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.misServicios;
      })
    ).subscribe(
      (res: any) => {
        this.servicios = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServices(): void {
    this.busqueda = '';
    this.categorias.forEach(categoria => {
      categoria.seleccionada = false;
    });

    this.servicesQuery.refetch();
  }

  unsuscribeServices(): void {
    this.servicesSubscription.unsubscribe();
  }

  suscribeServicesByCategories(): void {
    this.servicesByCategoriesQuery = this.servicesService.myServicesByCategories(this.categorias);
    this.servicesByCategoriesSubscription = this.servicesByCategoriesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.misServiciosPorCategorias;
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
    this.servicesBySearchQuery = this.servicesService.myServicesBySearch(busqueda);
    this.servicesBySearchSubscription = this.servicesBySearchQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.misServiciosPorBusqueda;
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
