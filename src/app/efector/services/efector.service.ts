import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Efector } from '../model/efector'

@Injectable({
  providedIn: 'root'
})
export class EfectorService {

  constructor() { }


  getEfectoresLocalization(): Observable<Efector[]> {
    return of([   
      {id: 1, nombre: 'HECA', domicilio: 'Pellegrini 2500', localidad: 'Rosario', telefono: 444555, zipcode: '2000', geo: {lat: -32.151268, lng: -60.321235}},
      {id: 2, nombre: 'Provincial', domicilio: 'Urquiza', localidad: 'Rosario', telefono: 444888, zipcode: '2000', geo: {lat: -38.101268, lng: -61.301235}},
    ]);
  }
} 
