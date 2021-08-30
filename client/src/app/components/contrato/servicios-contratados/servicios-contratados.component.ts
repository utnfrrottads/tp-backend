import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Contrato } from 'src/app/models/Contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-servicios-contratados',
  templateUrl: './servicios-contratados.component.html',
  styleUrls: ['./servicios-contratados.component.scss']
})
export class ServiciosContratadosComponent implements OnInit {

  contratos: Contrato[] = [];

  serviciosContratadosQuery: any;
  serviciosContratadosSubscription: any;

  constructor(private contratoService: ContratoService) { }

  ngOnInit(): void {
    this.suscribeServiciosContratados();
  }

  ngOnDestroy(): void {
    if (this.serviciosContratadosSubscription) this.unsuscribeServiciosContratados();
  }

  suscribeServiciosContratados(): void {
    this.serviciosContratadosQuery = this.contratoService.serviciosContratados();
    this.serviciosContratadosSubscription = this.serviciosContratadosQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.serviciosContratados;
      })
    ).subscribe(
      (res: Contrato[]) => {
        res.forEach(cont => {
          cont.fecha = new Date(cont.fecha!);
        });
        this.contratos = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshServiciosContratados(): void {
    this.serviciosContratadosQuery.refetch();
  }

  unsuscribeServiciosContratados(): void {
    this.serviciosContratadosSubscription.unsubscribe();
  }

}
