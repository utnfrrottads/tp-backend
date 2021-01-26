import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AtentionLevel, Hospital, HospitalResult } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';
  controller: string = '/api-hospitals/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getEfectoresLocalization(): Observable<Hospital[]> {
    return of([   
      {id: '3171', name: 'Centro de Salud "Elena Bazzet"', address: 'CABRINI MADRE 2717', locality: 'Rosario',  phone: 444555, zipcode: '2000',  options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', healthInsurances:[], accidentOrDiseases: [], beds: [], location: {latitude:-33.005810, longitude: -60.671392}},
      {id: '1175', name: 'Centro de Salud "Dr. Salvador Mazza"', address: 'GRANDOLI FLODUARDO 3498', locality: 'Rosario', phone: 444555, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'',  healthInsurances:[], accidentOrDiseases: [], beds: [],location: {latitude:-32.886982, longitude:  -60.734015}},
      {id: '1220', name: 'Hospital Provincial', address: 'ALEM LEANDRO N 1450', locality: 'Rosario', phone: 4807841, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', healthInsurances:[], accidentOrDiseases: [], beds: [], location: {latitude:-32.956261, longitude: -60.630512}},
      {id: '3169', name: 'Centro de Salud "Santa Lucí­a"', address: '1739 7691', locality: 'Rosario', phone: 444555, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', healthInsurances:[], accidentOrDiseases: [], beds: [], location: {latitude:-32.955491, longitude: -60.726453}}, 
      {id: '3743', name: 'Policlínico "San Martín"', address: 'CHUBUT 7145', locality: 'Rosario', phone: 4807800, zipcode: '2000', options:'', colorMarker: 'blanco', colorTextoMarker: 'blanco', atentionLevel:'', healthInsurances:[], accidentOrDiseases: [], beds: [], location: {latitude:-32.945930, longitude: -60.717514}}, 
    ]);
  }

/**
* `GETS` all hospitals of the collection
*/
  getHospitals(): Observable<HospitalResult>{ 
    return this.httpClient.get<HospitalResult>(this.baseUrl + this.controller);
  }

/**
* `CREATES` a hospital.
*/
  createHospital(hospital: Hospital): Observable<HospitalResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HospitalResult>(
      this.baseUrl + this.controller  + 'createHospital',
      hospital,
      httpOptions);
  }

/**
* `ADDS` an AccidentOrDisease treated by hospital.
  post('/addToAccidentOrDiseaseByIds/:idHospital/:idAccidentOrDisease'
*/ 
  addToAccidentOrDiseaseByIds(hospital: Hospital, idAccidentOrDisease: number): Observable<HospitalResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HospitalResult>(
      this.baseUrl + this.controller + 'addToAccidentOrDiseaseByIds'
                    + '/' + hospital.id 
                    + '/' + idAccidentOrDisease
      ,
      hospital,
      httpOptions);
  }
 
/**
* `UPDATES` a hospital by ID.
  put('/updateHospitalById/:id'
*/
updateHospitalById(hospital: Hospital): Observable<HospitalResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<HospitalResult>(
      this.baseUrl  + this.controller + 'updateHospitalById/' + hospital.id,
      hospital,
      httpOptions);
  } 
  /**
  * `DELETES` a hospital by ID.
  * delete('//:id'
  */
  deleteHospitalById(hospital: Hospital): Observable<HospitalResult>{     
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<HospitalResult>(
      this.baseUrl + this.controller + 'deleteHospitalById/' + hospital.id,
      httpOptions);
  }

   
  getAtentionLevel(): Observable<AtentionLevel[]>{
    return of([
      {"id": '1',"description": "Primer nivel" },
      {"id": '2',"description": "Segundo nivel" },
      {"id": '3',"description": "Tercer nivel" }
    ]);
  }
}