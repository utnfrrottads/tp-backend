import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { Servicio } from '../../models/Servicio';

@Component({
  selector: 'app-publicar-servicio',
  templateUrl: './publicar-servicio.component.html',
  styleUrls: ['./publicar-servicio.component.scss']
})
export class PublicarServicioComponent implements OnInit {

  categorias: Categoria[] = [];
  servicio: Servicio = new Servicio();

  serviceForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    precio: new FormControl('', [Validators.required, Validators.min(1), Validators.max(500000)])
  });

  constructor(private servicesService: ServicesService, private categoriaService: CategoriaService) {  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getAll().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }

  onSubmit(): void {
    this.servicio = new Servicio({...this.serviceForm.value});
    console.log(this.servicio); // categoria undefined
    this.servicesService.publish(this.servicio).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any)  => {
        console.log(err);
      }
    );
  }
}
