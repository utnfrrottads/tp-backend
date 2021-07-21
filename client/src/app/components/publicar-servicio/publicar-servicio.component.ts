import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moneda } from 'src/app/models/Moneda';
import { Servicio } from 'src/app/models/Servicio';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ServicesService } from 'src/app/services/services.service';
import { Categoria } from '../../models/Categoria';
import { Precio } from '../../models/Precio';

@Component({
  selector: 'app-publicar-servicio',
  templateUrl: './publicar-servicio.component.html',
  styleUrls: ['./publicar-servicio.component.scss'],
})
export class PublicarServicioComponent implements OnInit {
  categorias: Categoria[] = [];
  monedas: Moneda[] = [];

  serviceForm = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    valor: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(500000),
    ]),
    moneda: new FormControl('', [Validators.required]),
  });

  constructor(
    private servicesService: ServicesService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.monedas = JSON.parse(localStorage.getItem('monedas') || '');
  }

  getCategorias(): void {
    this.categoriaService.categorias().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }

  onSubmit(): void {
    this.servicesService.publish(this.serviceForm.value).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
