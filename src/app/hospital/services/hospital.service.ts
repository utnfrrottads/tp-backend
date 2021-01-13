import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hospital, HospitalResult } from '../model/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';
  constructor(
    private httpClient: HttpClient
  ) { }

  getHospitals(): Observable<HospitalResult>{ 
    return this.httpClient.get<HospitalResult>(this.baseUrl+'/api-hospitals');
  }

  getEfectoresLocalization(): Observable<Hospital[]> {
    return of([   
      {id: 3171, name: 'Centro de Salud "Elena Bazzet"', address: 'CABRINI MADRE 2717', locality: 'Rosario',  phone: 444555, zipcode: '2000',  options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', location: {lat:-33.005810, lng: -60.671392}},
      {id: 1175, name: 'Centro de Salud "Dr. Salvador Mazza"', address: 'GRANDOLI FLODUARDO 3498', locality: 'Rosario', phone: 444555, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', location: {lat:-32.886982, lng:  -60.734015}},
      {id: 1220, name: 'Hospital Provincial', address: 'ALEM LEANDRO N 1450', locality: 'Rosario', phone: 4807841, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', location: {lat:-32.956261, lng: -60.630512}},
      {id: 3169, name: 'Centro de Salud "Santa Lucí­a"', address: '1739 7691', locality: 'Rosario', phone: 444555, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', location: {lat:-32.955491, lng: -60.726453}}, 
      {id: 3743, name: 'Policlínico "San Martín"', address: 'CHUBUT 7145', locality: 'Rosario', phone: 4807800, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', location: {lat:-32.945930, lng: -60.717514}}, 
    ]);
  }
}