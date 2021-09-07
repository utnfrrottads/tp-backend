import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moneda } from 'src/app/models/Moneda';
import { ServicioService } from 'src/app/services/servicio.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { Categoria } from '../../../models/Categoria';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-publicar-servicio',
  templateUrl: './publicar-servicio.component.html',
  styleUrls: ['./publicar-servicio.component.scss'],
})
export class PublicarServicioComponent implements OnInit {

  @Output() nuevoServicio = new EventEmitter();

  @Input() categorias: Categoria[] = [];

  monedas: Moneda[] = [];

  monedasQuery: any;
  monedasSubscription: any;

  errorMessage = '';

  serviceForm = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
    ]),
    valor: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    moneda: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });

  constructor(
    private servicioService: ServicioService,
    private monedaService: MonedaService
  ) { }

  ngOnInit(): void {
    this.suscribeMonedas();
  }

  ngOnDestroy(): void {
    if (this.monedasSubscription) this.unsuscribeMonedas();
  }

  suscribeMonedas(): void {
    this.monedasQuery = this.monedaService.monedas();
    this.monedasSubscription = this.monedasQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.monedas;
      })
    ).subscribe(
      (res: Moneda[]) => {
        this.monedas = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshMonedas(): void {
    this.monedasQuery.refetch();
  }

  unsuscribeMonedas(): void {
    this.monedasSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.servicioService.publish(this.serviceForm.value).subscribe(
      (res: any) => {
        this.errorMessage = '';
        $('#publicarServicioPopup').modal('hide');
        Swal.fire({
          title: '¡Servicio publicado!',
          text:
            'El servicio ' +
            this.serviceForm.value.titulo +
            ' se registró correctamente',
        });
        this.nuevoServicio.emit();
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }

}
