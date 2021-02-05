import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodType, Gender, Person, PersonResult } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';

  constructor(
    private httpClient: HttpClient
  ) { }

  /** `GETS` all persons of the collection. */ 
  getPersons(): Observable<PersonResult>{ 
    return this.httpClient.get<PersonResult>(this.baseUrl+'/api-persons');
  }

  /** CREATES` a Person.
   *  createHealthInsurance */  
  createPerson(person: Person): Observable<PersonResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<PersonResult>(
      this.baseUrl + '/api-persons/createPerson/',
      person,
      httpOptions);
  }


  /** `ADDS` a HealthInsurance that belongs to the person.
   *  '/addToHealthInsuranceById/:idPerson/:idHealthInsurance'  
  */ 
  createAffiliatedHealthInsurance(person: Person): Observable<PersonResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<PersonResult>(
      this.baseUrl + '/api-persons/addToHealthInsuranceById' 
                    + '/' + person.id
                    + '/' + person.healthInsuranceId, //nuevo nombre sera idHealthInsurance
                    person,
      httpOptions);
  }
  
  /** `UPDATES` a person by ID. 
   * put('/updatePersonById/:id'
  */
  updatePersonById(person: Person): Observable<PersonResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<PersonResult>(
      this.baseUrl + '/api-persons/updatePersonById/' + person.id,
      person,
      httpOptions);
  } 

  /** `DELETES` a person by ID.
   * '/deletePersonById/:id'
   */
  deletePersonById(person: Person): Observable<PersonResult>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<PersonResult>(
      this.baseUrl + '/api-persons/deletePersonById/' + person.id,
      httpOptions);
  } 

  getBloodTypes(): Observable<BloodType[]>{
    return of([
      {"id": 1,"description": "O-" },
      {"id": 2,"description": "O+" },
      {"id": 3,"description": "A-" },
      {"id": 4,"description": "A+" },
      {"id": 5,"description": "B-" },
      {"id": 6,"description": "B+" },
      {"id": 7,"description": "AB-" },
      {"id": 8,"description": "AB+" }
    ]);
  }
  getGenders(): Observable<Gender[]>{
    return of([
      {"id": 1,"description": "Femenino" },
      {"id": 2,"description": "Masculino" },
      {"id": 3,"description": "Otro" }, 
    ]);
  } 
}
