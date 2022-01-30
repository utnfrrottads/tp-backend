import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';

import { Servicio } from 'src/app/models/Servicio';
import { Categoria } from 'src/app/models/Categoria';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-categoria-template',
  templateUrl: './categoria-template.component.html',
  styleUrls: ['./categoria-template.component.scss']
})
export class CategoriaTemplateComponent implements OnInit {

  servicios: Servicio[] = [];
  servicesQuery: any;
  servicesSubscription: any;
  @Input() categoria: Categoria = {
    _id: '',
    descripcion: '',
  };

  constructor(
    private servicioService: ServicioService
    ) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
      this.categoria.seleccionada = true
      this.suscribeServices();
    }
  
    ngOnDestroy(): void {
      if (this.servicesSubscription) this.unsuscribeServices();
    }
  
    suscribeServices(): void {
      this.servicesQuery = this.servicioService.servicios('', [this.categoria]);
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

    unsuscribeServices(): void {
      this.servicesSubscription.unsubscribe();
    }

}
