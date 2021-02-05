import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HospitalAccidentOrDiseases } from 'src/app/hospital/models/hospital';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../models/accidentOrDiseases';

@Injectable({
  providedIn: 'root'
})
export class AccidentDiseasesService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';
  controller: string = '/api-hospitals/';

  constructor(
    private httpClient: HttpClient
  ) { }


  /**
   * `GETS` all accidentOrDiseases of the collection.
   * get('/'
  */
  getAccidentOrDiseases(): Observable<AccidentOrDiseasesResult>{ 
    return this.httpClient.get<AccidentOrDiseasesResult>(this.baseUrl + this.controller);
  }



  /**
  * `CREATES` a accidentOrDisease.
    post('/createAccidentOrDisease' 
  */
  createAccidentOrDisease(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<AccidentOrDiseasesResult>(
      this.baseUrl + this.controller  + 'createAccidentOrDisease',
      accidentOrDiseases,
      httpOptions);
  }

  
  /**
  * `ADDS` an AffiliatedAccidentOrDisease
  ' put(/addToHospitalByIds/:idHospital/:idAccidentOrDisease'
  */
  affiliatedAccidentOrDisease(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases): Observable<AccidentOrDiseasesResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<AccidentOrDiseasesResult>(
      this.baseUrl + this.controller + 'addToHospitalByIds'
                    + '/' + hospitalAccidentOrDiseases.idHospital
                    + '/' + hospitalAccidentOrDiseases.idAccidentOrDisease
      ,
      hospitalAccidentOrDiseases,
      httpOptions);
  } 


  /**
  * `UPDATES` a AccidentOrDisease by ID.
    put('/updateAccidentOrDiseaseById/:id'
  */
  updateAccidentOrDiseaseById(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<AccidentOrDiseasesResult>(
      this.baseUrl  + this.controller + 'updateAccidentOrDiseaseById/' + accidentOrDiseases.id,
      accidentOrDiseases,
      httpOptions);
  } 
  
  /**
  * `DELETES` a hospital by ID.
  * /deleteAccidentOrDiseaseById/:id
  */
  deleteAccidentOrDiseaseById(accidentOrDiseases: AccidentOrDiseases): Observable<AccidentOrDiseasesResult>{     
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<AccidentOrDiseasesResult>(
      this.baseUrl + this.controller + 'deleteAccidentOrDiseaseById/' + accidentOrDiseases.id,
      httpOptions);
  }

}
