import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { map } from 'rxjs/operators';
import { Categoria } from '../../../models/Categoria';

@Component({
  selector: 'app-servicios-por-categoria',
  templateUrl: './servicios-por-categoria.component.html',
  styleUrls: ['./servicios-por-categoria.component.scss']
})
export class ServiciosPorCategoriaComponent implements OnInit {
  
  categorias: Categoria[] = [];

  categoriasQuery: any;
  categoriasSubscription: any;

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    this.unsuscribeCategorias();
  }

  suscribeCategorias(): void {
    this.categoriasQuery = this.categoriaService.categorias();
    this.categoriasSubscription = this.categoriasQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.categorias;
      })
    ).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }

  unsuscribeCategorias(): void {
    this.categoriasSubscription.unsubscribe();
  }

}
