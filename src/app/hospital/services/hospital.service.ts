import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccidentOrDiseasesResult } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { BedResult } from 'src/app/bed/models/bed';
import { HealthInsuranceResult } from 'src/app/health-insurance/models/health-insurance';
import { AtentionLevel, Hospital, HospitalResult } from '../models/hospital';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl = environment.baseUrl;
  controller = '/api-hospitals/';

  constructor(
    private httpClient: HttpClient
  ) { }
/**
 * Formatea el hospital para que obtenga correctamente el lat y lng para el mapa de Google
 * @param hospitals array con los datos de los hospitales
 */
  getFormatOkFrontendHospital(hospitals: Hospital[]): Hospital[] {
    return hospitals.map(item => {
      const objetFormat = this.initObjectHospital();
      objetFormat.id = item.id;
      objetFormat.name = item.name;
      objetFormat.address = item.address;
      objetFormat.locality = item.locality;
      objetFormat.phone = item.phone;
      objetFormat.location = item.location;
      objetFormat.locationGoogleMap = { lat: item.location.latitude, lng: item.location.longitude },
      objetFormat.atentionLevel = item.atentionLevel;
      objetFormat.healthInsurances = item.healthInsurances;
      objetFormat.accidentOrDiseases = item.accidentOrDiseases;
      objetFormat.beds = item.beds;
      objetFormat.freeBeds = item.freeBeds;
      return objetFormat;
    }) ;
  }
/**
 * Inicializa el objeto
 */
  initObjectHospital(): Hospital {
    return {
      id : '',
      name: '',
      address : '',
      locality : '',
      phone : 0,
      freeBeds: 0,
      location : {latitude: 0, longitude: 0},
      locationGoogleMap : {lat: 0, lng: 0},
      options: '',
      atentionLevel: '',
      healthInsurances: [],
      accidentOrDiseases: [],
      beds: [],
      emergencies: []
    };
  }

/**
 * `GETS` all hospitals of the collection
 */
  getHospitals(): Observable<HospitalResult>{
    return this.httpClient.get<HospitalResult>(this.baseUrl + this.controller);
  }
/**
 * `GETS` the closest hospitals by lat long.
 */
 getClosestHospitals(atentionLevel: string): Observable<HospitalResult>{
    return this.httpClient.get<HospitalResult>(
      `${this.baseUrl}${this.controller}getClosestHospitals/${atentionLevel}`);
  }
/**
 * `GETS` the closest hospitals by lat long.
 * get('/getAllAccidentsOrDiseasesById/:idHospital'
 */
  getAllAccidentsOrDiseasesById(idHospital: string): Observable<AccidentOrDiseasesResult>{
    return this.httpClient.get<AccidentOrDiseasesResult>(
      `${this.baseUrl}${this.controller}getAllAccidentsOrDiseasesById/${idHospital}`);
  }
/**
 * `GETS` all HealthInsurances of the Hospital.
 * get('/getAllHealthInsurancesById/:idHospital'
 */
  getAllHealthInsurancesById(idHospital: string): Observable<HealthInsuranceResult>{
    return this.httpClient.get<HealthInsuranceResult>(
      `${this.baseUrl}${this.controller}getAllHealthInsurancesById/${idHospital}`);
  }
/**
 * `GETS` all Beds of the Hospital.
 *  get('/getAllBedsById/:idHospital',
 */
  getAllBedsById(idHospital: string): Observable<BedResult>{
    return this.httpClient.get<BedResult>(
      `${this.baseUrl}${this.controller}getAllBedsById/${idHospital}`);
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
 *  post('/addToAccidentOrDiseaseByIds/:idHospital/:idAccidentOrDisease'
 */
  addToAccidentOrDiseaseByIds(hospital: Hospital, idAccidentOrDisease: string): Observable<HospitalResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HospitalResult>(
      `${this.baseUrl}${this.controller}addToAccidentOrDiseaseByIds/${hospital.id}/${idAccidentOrDisease}`,
      hospital,
      httpOptions);
  }

/**
 * `UPDATES` a hospital by ID.
 *  put('/updateHospitalById/:id'
 */
updateHospitalById(hospital: Hospital): Observable<HospitalResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.put<HospitalResult>(
      `${this.baseUrl}${this.controller}updateHospitalById/${hospital.id}`,
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
      `${this.baseUrl}${this.controller}deleteHospitalById/${hospital.id}`,
      httpOptions);
  }

  getAtentionLevel(): Observable<AtentionLevel[]>{
    return of([
      { id: '1', description: 'Primer nivel' },
      { id: '2', description: 'Segundo nivel' },
      { id: '3', description: 'Tercer nivel' }
    ]);
  }
}
