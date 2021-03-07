import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital, HospitalAccidentOrDiseases, HospitalResult } from 'src/app/hospital/models/hospital';
import { environment } from 'src/environments/environment';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../models/accidentOrDiseases';

@Injectable({
  providedIn: 'root'
})
export class AccidentDiseasesService {

  baseUrl = environment.baseUrl;
  controller = '/api-accidentOrDiseases/';

  constructor(
    private httpClient: HttpClient
  ) { }

/**
 * `GETS` all accidentOrDiseases of the collection.
 *  @tutorial get '/getAllAccidentsOrDiseases'
 */
  getAllAccidentsOrDiseases(): Observable<AccidentOrDiseasesResult>{
    return this.httpClient.get<AccidentOrDiseasesResult>(
        `${this.baseUrl}/api-accidentOrDiseases/getAllAccidentsOrDiseases`);
  }

/**
 * `GETS` all hospitals by accidentOrDisease of the collection.
 *  @tutorial get '/getAllHospitalsByAccidentOrDiseasesId/:idaccidentOrDisease'
 */
getAllHospitalsByAccidentOrDiseasesId(idaccidentOrDisease: string): Observable<HospitalResult>{
  return this.httpClient.get<HospitalResult>(
    `${this.baseUrl}/api-accidentOrDiseases/getAllHospitalsByAccidentOrDiseasesId/${idaccidentOrDisease}`
    );
}

 /**
  * `CREATES` a accidentOrDisease.
  *  @tutorial post '/createAccidentOrDisease'
  */
  createAccidentOrDisease(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<AccidentOrDiseasesResult>(
      `${this.baseUrl}/api-accidentOrDiseases/createAccidentOrDisease`,
      accidentOrDiseases,
      httpOptions);
  }

 /**
  * `ADDS` an AffiliatedAccidentOrDisease
  *  @tutorial post /addToHospitalByIds/:idHospital/:idAccidentOrDisease
  */
  addToHospitalByIds(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases): Observable<AccidentOrDiseasesResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return this.httpClient.post<AccidentOrDiseasesResult>(
      `${this.baseUrl}/api-accidentOrDiseases/addToHospitalByIds`
        + `/${hospitalAccidentOrDiseases.idHospital}/${hospitalAccidentOrDiseases.idAccidentOrDisease}`,
      hospitalAccidentOrDiseases,
      httpOptions);
  }

 /**
  * `UPDATES` a AccidentOrDisease by ID.
  *  @tutorial put /updateAccidentOrDiseaseById/:id
  */
  updateAccidentOrDiseaseById(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.put<AccidentOrDiseasesResult>(
      `${this.baseUrl}/api-accidentOrDiseases/updateAccidentOrDiseaseById/${accidentOrDiseases.id}`,
      accidentOrDiseases,
      httpOptions);
  }
 /**
  * `DELETES` a hospital by ID.
  * @tutorial delete deleteAccidentOrDiseaseById/:id
  */
  deleteAccidentOrDiseaseById(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.delete<AccidentOrDiseasesResult>(
      `${this.baseUrl}/api-accidentOrDiseases/deleteAccidentOrDiseaseById/${accidentOrDiseases.id}`,
      httpOptions);
  }

}
