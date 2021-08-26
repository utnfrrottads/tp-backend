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
  busqueda: String = '';
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
    this.monedas = JSON.parse(localStorage.getItem('monedas') || '[]');
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    if (this.servicesSubscription) this.unsuscribeServices();
    if (this.categoriasSubscription) this.unsuscribeCategorias();
  }

  suscribeServices(): void {
    this.servicesQuery = this.servicesService.services(this.busqueda, this.categorias);
    this.servicesSubscription = this.servicesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.servicios;
      })
    ).subscribe(
      (res: any) => {
        this.servicios = [];
        res.forEach((serv: Servicio) => {
          serv.fechaHoraPublicacion = new Date(serv.fechaHoraPublicacion!);
          this.servicios.push(serv);
        });
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
        this.categorias = [];
        res.forEach((categoria: Categoria) => {
          this.categorias.push({ _id: categoria._id, descripcion: categoria.descripcion, seleccionada: true });
        });

        this.suscribeServices();
      },
      (err: any) => console.log(err)
    );
  }

  unsuscribeCategorias(): void {
    this.categoriasSubscription.unsubscribe();
  }

  actualizarServicios(busqueda: String) {
    this.busqueda = busqueda;
    this.suscribeServices();
  }

}
