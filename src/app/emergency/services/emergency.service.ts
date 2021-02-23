import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emergency, EmergencyResult } from '../models/emergency';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService{
  
  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';

  constructor(
    private httpClient: HttpClient
    ) { }

/**
* `GETS` all emergencys of the collection.
*/
getEmergencies(): Observable<EmergencyResult>{ 
  return this.httpClient.get<EmergencyResult>(this.baseUrl+'/api-emergencies');
} 
/**
* `CREATES` a emergency.
*  post /createEmergency/hospital/:idHospital/bed/:idBed/accidendOrDisease/:idAccidentOrDisease
    @property locality requerido.
    @property ambulanceLicensePlate requerido.
    @property location requerido.
*/
createEmergency(emergency: Emergency, idHospital: string, idBed: string, idAccidentOrDisease: string): Observable<EmergencyResult>{    
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.httpClient.post<EmergencyResult>(
    this.baseUrl + '/api-emergencies/createEmergency' 
    + '/hospital/' + idHospital 
    + '/bed/' + idBed 
    + '/accidendOrDisease/' + idAccidentOrDisease,
    emergency,
    httpOptions);
}

/**
* `ADDS` an AccidentOrDisease treated by emergency.
@param idEmergency requerido, 20 caracteres,alfanumérico,
@param idAccidentOrDisease requerido,20 caracteres,alfanumérico
*/
addToAccidentOrDiseaseByIds(emergency: Emergency, idEmergency: string, idAccidentOrDisease: string): Observable<EmergencyResult>{    
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
return this.httpClient.post<EmergencyResult>(
  this.baseUrl + '/api-emergencies/addToAccidentOrDiseaseByIds/' 
  + idEmergency 
  + idAccidentOrDisease,
  emergency,
  httpOptions);
}

/**
* `UPDATES` a emergency by ID.
@param emergency es utilizado para parámetro y para body 
*/
updateEmergencyById(emergency: Emergency): Observable<EmergencyResult>{    
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};     
return this.httpClient.put<EmergencyResult>(
  this.baseUrl + '/api-emergencies/updateEmergencyById' 
               + '/' + emergency.id,
  emergency,
  httpOptions);
} 

/**
* `DELETES` a emergency by ID.
 /deleteEmergencyById/:id
*/
deleteEmergencyById(emergency: Emergency): Observable<EmergencyResult>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };     
  return this.httpClient.delete<EmergencyResult>(
    this.baseUrl + '/api-emergencies/deleteEmergencyById/' + emergency.id,
    httpOptions);
} 
}
