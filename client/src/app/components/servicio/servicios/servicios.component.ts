import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ServicesService } from 'src/app/services/servicio.service';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
import { Moneda } from 'src/app/models/Moneda';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

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
    this.servicesQuery = this.servicesService.servicios(this.busqueda, this.categorias);
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

  seleccionarCategoria(serv: Servicio) {
    this.busqueda = '';
    this.categorias.forEach((categoria: Categoria) => {
      if (categoria._id === serv.categoria?._id) {
        categoria.seleccionada = true;
      } else {
        categoria.seleccionada = false;
      }
    });
    this.suscribeServices();
  }

}
