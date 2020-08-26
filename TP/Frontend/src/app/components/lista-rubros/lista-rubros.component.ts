import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { RubrosService } from '../../services/rubros.service';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.scss']
})
export class ListaRubrosComponent implements OnInit {

  rubros:any=[];
  constructor(private rubrosService: RubrosService) { }

  ngOnInit(): void {
    //traigo todos los rubros
    this.rubrosService.getRubros()
    .subscribe((res)=>{
      this.rubros = res;
    })

  }
}
