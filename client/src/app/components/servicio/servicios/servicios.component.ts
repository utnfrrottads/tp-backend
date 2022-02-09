import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ServicioService } from 'src/app/services/servicio.service';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ServicesPanelComponent } from '../services-panel/services-panel.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  @ViewChild(ServicesPanelComponent)
  servicesPanel = new ServicesPanelComponent;

  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  busqueda: String = '';

  servicesQuery: any;
  servicesSubscription: any;
  categoriasQuery: any;
  categoriasSubscription: any;
  categoryQuery: any;
  categorySubscription: any;

  constructor(
    private servicioService: ServicioService,
    public categoriasService: CategoriaService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.suscribeCategorias(this.queryParamsHandler, true);
  }

  ngOnDestroy(): void {
    if (this.servicesSubscription) this.unsuscribeServices();
    if (this.categoriasSubscription) this.unsuscribeCategorias();
  }

  subscribeCategory(idCategoria: String): void {
    this.categoryQuery = this.categoriasService.getCategoriaById(idCategoria);
    this.categorySubscription = this.categoryQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.getCategoriaById;
      })
    ).subscribe(
      (category: Categoria) => {
        this.seleccionar(category);
      },
      (err: any) => console.log(err)
    );
  }

  suscribeServices(): void {
    this.servicesQuery = this.servicioService.servicios(this.busqueda, this.categorias);
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

  suscribeCategorias(callback?: (() => void), bindThis: Boolean = false): void {
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
        if (callback) {
          if (bindThis) {
            callback = callback.bind(this);
          }
          callback();
        }
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

  seleccionar(categoria: Categoria) {
    this.busqueda = '';
    this.categorias.forEach((item: Categoria) => {
      console.log(categoria.descripcion)
      if (item._id === categoria._id) {
        item.seleccionada = true;
      } else {
        item.seleccionada = false;
      }
    });
    this.suscribeServices();
  }

  queryParamsHandler(): void {
    this.route.queryParams.subscribe({
      next: (queryParams: any) => {
        let idCategoria = queryParams["idCategoria"];
        if (idCategoria) {
          this.subscribeCategory(idCategoria);
        }

        if (queryParams["showPublicarServicio"]) {
          this.servicesPanel.publicarServicio();
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
