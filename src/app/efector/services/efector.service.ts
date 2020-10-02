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
      {id: 3171, nombre: 'Centro de Salud "Elena Bazzet"', domicilio: 'CABRINI MADRE 2717', zona:'Sudoeste', distrito:'Sudoeste', localidad: 'Rosario', info:'133 Negra, 133 Verde, 134, 143 Negra, Ronda CUR Sur		Municipal	Teléfono: 4809197', telefono: 444555, zipcode: '2000', colorMarker: 'blanco', colorTextoMarker: 'blanco', geo: {lat:-33.005810, lng: -60.671392}},
      {id: 1175, nombre: 'Centro de Salud "Dr. Salvador Mazza"', domicilio: 'GRANDOLI FLODUARDO 3498', zona:'Norte', distrito:'Norte', localidad: 'Rosario', info:'106 Ibarlucea', telefono: 444555, zipcode: '2000', colorMarker: 'blanco', colorTextoMarker: 'blanco',geo: {lat:-32.886982, lng:  -60.734015}},
      {id: 1220, nombre: 'Hospital Provincial', domicilio: 'ALEM LEANDRO N 1450', zona:'Centro', distrito:'Centro', localidad: 'Rosario', info:'102 Negra, 102 Roja, 115, 115 Aeropuerto, 122 Roja, 122 Verde, 131, 132, 133 Negra, 133 Verde, 143 Negra, 143 Roja, 145 Cabin 9, 145 Perez-Soldini, 146 Negra, 146 Roja, K, Q', telefono: 4807841, zipcode: '2000', colorMarker: 'blanco', colorTextoMarker: 'blanco', geo: {lat:-32.956261, lng: -60.630512}},
      {id: 3169, nombre: 'Centro de Salud "Santa Lucí­a"', domicilio: '1739 7691', zona:'Oeste', distrito:'Oeste', localidad: 'Rosario', info:'153 Negra, Enlace Barrio Santa Lucia', telefono: 444555, zipcode: '2000', colorMarker: 'blanco', colorTextoMarker: 'blanco', geo: {lat:-32.955491, lng: -60.726453}}, 
      {id: 3743, nombre: 'Policlínico "San Martín"', domicilio: 'CHUBUT 7145', zona:'Noroeste', distrito:'Noroeste', localidad: 'Rosario', info:'153 Negra, 153 Roja, Enlace Barrio Santa Lucia', telefono: 4807800, zipcode: '2000', colorMarker: 'blanco', colorTextoMarker: 'blanco', geo: {lat:-32.945930, lng: -60.717514}}, 
    ]);
  }
}   
  