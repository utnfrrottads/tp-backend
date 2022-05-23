import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ServicioService } from 'src/app/services/servicio.service';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
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

  servicesQuery: any;
  servicesSubscription: any;
  categoriasQuery: any;
  categoriasSubscription: any;

  constructor(
    private servicioService: ServicioService,
    private categoriasService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    if (this.servicesSubscription) this.unsuscribeServices();
    if (this.categoriasSubscription) this.unsuscribeCategorias();
  }

  suscribeServices(): void {
    this.servicesQuery = this.servicioService.misServicios(this.busqueda, this.categorias);
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
        this.categorias.forEach(categoria => {
          categoria.seleccionada = true;
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
