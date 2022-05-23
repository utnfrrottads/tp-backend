import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { map } from 'rxjs/operators';
import { Categoria } from '../../../models/Categoria';

@Component({
  selector: 'app-servicios-por-categorias',
  templateUrl: './servicios-por-categorias.component.html',
  styleUrls: ['./servicios-por-categorias.component.scss']
})
export class ServiciosPorCategoriasComponent implements OnInit {
  
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
