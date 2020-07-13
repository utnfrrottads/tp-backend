import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.scss']
})
export class ListaRubrosComponent implements OnInit {

  rubros:Rubro[];
  constructor() { }

  ngOnInit(): void {
    this.rubros = [
      {idRubro:1,descripcion:"Tecnologia"}, 
      {idRubro:2,descripcion:"Alimentos"},
      {idRubro:3,descripcion:"Ropa e Indumentaria"},
      {idRubro:4,descripcion:"Vehículos"},
      {idRubro:5, descripcion:"Escolar"},
      
    ];
    console.log(this.rubros);
  }



}
