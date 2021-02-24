import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HealthInsurance, HealthInsuranceResult } from '../models/health-insurance';
import { HospitalHealthInsurance, HospitalHealthInsurances } from 'src/app/hospital/models/hospital';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }   
  
  /** GETS all HealthInsurances of the collection. */
  getHealthInsurances(): Observable<HealthInsuranceResult>{ 
    return this.httpClient.get<HealthInsuranceResult>(this.baseUrl+'/api-healthInsurances');
  }

  /** CREATES` a healthInsurance.
   createHealthInsurance */
  createHealthInsurance(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/createHealthInsurance/',
      healthInsurance,
      httpOptions);
  }

  /** ADD an AffiliatedHealthInsurance
   addToHospitalByIds/:idHospital/:idHealthInsurance */   
  createAffiliatedHealthInsurance(hospitalHealthInsurance: HospitalHealthInsurance): Observable<any>{    
//  createAffiliatedHealthInsurance(hospitalHealthInsurance: HospitalHealthInsurance): Observable<HealthInsuranceResult>{ 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/addToHospitalByIds' 
                    + '/' + hospitalHealthInsurance.idHospital
                    + '/' + hospitalHealthInsurance.idHealthInsurance,

                    
                    // + '/' + hospitalHealthInsurances.hospital.id
                    // + '/' + hospitalHealthInsurances.healthInsurances.id,
      hospitalHealthInsurance,
      httpOptions);
  }
  
  /** UPDATES a HealthInsurance by ID.
  updateHealthInsuranceById/:id */
  updateHealthInsuranceById(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/updateHealthInsuranceById/' + healthInsurance.id,
      healthInsurance,
      httpOptions);
  } 

  /**  DELETES a healthInsurance by ID.
   deleteHealthInsuranceById/:id
  */
  deleteHealthInsuranceById(healthInsurance: HealthInsurance): Observable<HealthInsuranceResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<HealthInsuranceResult>(
      this.baseUrl + '/api-healthInsurances/deleteHealthInsuranceById/' + healthInsurance.id,
      httpOptions);
  } 
}
