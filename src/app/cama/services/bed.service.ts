import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BedSummary, BedMonthly, BedType, BedStatus, Bed, BedResult, BedSubType } from '../models/bed';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';

  constructor(
    private httpClient: HttpClient
  ) { }

  getBedSummary(): Observable<BedSummary[]> {
    return of([
      { title: "Gasto público Covid", value: "4657863", isIncrease: false, color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
      { title: "Camas libres", value: "34", isIncrease: false, color: "primary", percentValue: "0.9383", icon: "single_bed", isCurrency: false },
      { title: "Pacientes con Covid", value: "13709", isIncrease: true, color: "warn", percentValue: "0.4565", icon: "healing", isCurrency: false },
      { title: "Personal médico afectado a Covid", value: "198", isIncrease: false, color: "primary", percentValue: "0.3361", icon: "portrait", isCurrency: false }
    ]);
  }

  getBedCount(): Observable<any[]> {
    return of([20]); // to do 
  }
    
  getBedsByMonth(): Observable<BedMonthly[]>{
    return of([
      {"month": "Ene","count": 35 },
      {"month": "Feb","count": 25},
      {"month": "Mar","count": 35 },
      {"month": "Abr","count": 49 },
      {"month": "May","count": 53 },
      {"month": "Jun","count": 51 },
      {"month": "Jul","count": 59 },
      {"month": "Ago","count": 69 },
      {"month": "Sep","count": 85 },
      {"month": "Oct","count": 89 }
    ]);
  }


  getBeds(): Observable<BedResult>{ 
    return this.httpClient.get<BedResult>(this.baseUrl+'/api-beds');
  }

  // CREATES a bed by idHospital and adds it as a subcollection
  // /createBedByIdHospital/:id
  createBed(bed: Bed): Observable<BedResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<BedResult>(
      this.baseUrl + '/api-beds/createBedByIdHospital/' + bed.idHospital,
      bed,
      httpOptions);
  }

  // UPDATES a bed by idHospital and idBed.
  // /updatebyIds/:idHospital/:idBed
  updateBedById(bed: Bed): Observable<BedResult>{    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.put<BedResult>(
      this.baseUrl + '/api-beds/updatebyIds/' + bed.idHospital + '/' + bed.id,
      bed,
      httpOptions);
  } 
  // DELETES a bed by idHospital and idBed
  // /deleteBedByIds/:idHospital/:idBed
  deleteBedById(bed: Bed): Observable<BedResult>{    
    console.log('por eliminar: ',bed);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };     
    return this.httpClient.delete<BedResult>(
      this.baseUrl + '/api-beds/deleteBedByIds/' + bed.idHospital + '/' + bed.id,
      httpOptions);
  } 

  getBedType(): Observable<BedType[]>{
    return of([
      {"id": 1,"description": "Crítica" },
      {"id": 2,"description": "General" }
    ]);
  }
  getBedSubType(): Observable<BedSubType[]>{
    return of([
      {"id": 1,"description": "Adulto" },
      {"id": 2,"description": "Neonatología" },
      {"id": 3,"description": "Pediátrico" },
    ]);
  }
  getBedStatus(): Observable<BedStatus[]>{
    return of([
      {"id": 1,"description": "Libre" },
      {"id": 2,"description": "Ocupada" },
      {"id": 3,"description": "Fuera de linea" },
      {"id": 4,"description": "Reparacion" },
      {"id": 5,"description": "Reservada" },
      {"id": 6,"description": "Potencialmente disponible" }
    ]);
  } 
}