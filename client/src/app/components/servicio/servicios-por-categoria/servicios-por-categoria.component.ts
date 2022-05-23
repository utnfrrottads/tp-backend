import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-servicios-por-categoria',
  templateUrl: './servicios-por-categoria.component.html',
  styleUrls: ['./servicios-por-categoria.component.scss']
})
export class ServiciosPorCategoriaComponent implements OnInit {

  idCategoria: string = '';
  categoria: Categoria = {};

  categoriaQuery: any;
  categoriaSubscription: any;

  constructor(
    public bsModalRef: BsModalRef,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.suscribeCategoria();
  }

  ngOnDestroy(): void {
    this.unsuscribeCategoria();
  }

  suscribeCategoria(): void {
    this.categoriaQuery = this.categoriaService.getCategoriaById(this.idCategoria);
    this.categoriaSubscription = this.categoriaQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.getCategoriaById;
      })
    ).subscribe(
      (res: any) => {
        this.categoria = res;
      },
      (err: any) => console.log(err)
    );
  }

  unsuscribeCategoria(): void {
    this.categoriaSubscription.unsubscribe();
  }

  cerrarModal(): void {
    this.bsModalRef.hide();
  }

}
