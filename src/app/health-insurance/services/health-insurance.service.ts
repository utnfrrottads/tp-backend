import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HealthInsurance, HealthInsuranceResult } from '../models/health-insurance';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';

  constructor(
    private httpClient: HttpClient
  ) { }   
  
  // GETS all HealthInsurances of the collection.
  getHealthInsurances(): Observable<HealthInsuranceResult>{ 
    return this.httpClient.get<HealthInsuranceResult>(this.baseUrl+'/api-healthInsurances');
  }

  // CREATES` a healthInsurance.
  // createHealthInsurance
  createHealthInsurance(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/createHealthInsurance/',
      healthInsurance,
      httpOptions);
  }

  // ADD an AffiliatedHealthInsurance
  // /addToHospitalByIds/:idHospital/:idHealthInsurance
  createAffiliatedHealthInsurance(healthInsurance: HealthInsurance, idHospital: string): Observable<HealthInsuranceResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/addToHospitalByIds' 
                    + '/' + idHospital
                    + '/' + healthInsurance.id,
      healthInsurance,
      httpOptions);
  }
  
  // UPDATES a HealthInsurance by ID.
  // updateHealthInsuranceById/:id
  updateHealthInsuranceById(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/updateHealthInsuranceById/' + healthInsurance.id,
      healthInsurance,
      httpOptions);
  } 

  // DELETES a healthInsurance by ID.
  // deleteHealthInsuranceById/:id
  deleteHealthInsuranceById(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/deleteHealthInsuranceById/' + healthInsurance.id,
      httpOptions);
  } 
}
