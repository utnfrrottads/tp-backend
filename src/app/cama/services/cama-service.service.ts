import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CamaSummary, CamaMonthly, TipoCama, EstadoCama, Cama } from '../models/cama';


@Injectable({
  providedIn: 'root'
})
export class CamaService {
  baseUrl: string = 'https://us-central1-tp-ttads-cecb8.cloudfunctions.net';
  constructor(
    private httpClient: HttpClient
  ) { }

  getCamaSummary(): Observable<CamaSummary[]> {
    return of([
      { title: "Gasto público Covid", value: "4657863", isIncrease: false, color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
      { title: "Camas libres", value: "34", isIncrease: false, color: "primary", percentValue: "0.9383", icon: "single_bed", isCurrency: false },
      { title: "Pacientes con Covid", value: "13709", isIncrease: true, color: "warn", percentValue: "0.4565", icon: "healing", isCurrency: false },
      { title: "Personal médico afectado a Covid", value: "198", isIncrease: false, color: "primary", percentValue: "0.3361", icon: "portrait", isCurrency: false }
    ]);
  }

  getCamaCount(): Observable<any[]> {
    return of([20]); // to do 
  }
    
  getCamasByMonth(): Observable<CamaMonthly[]>{ 
    //return this.httpClient.get<CamaMonthly[]>(this.baseUrl);
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


  getCamas(): Observable<any[]>{ 
    
    return this.httpClient.get<any[]>(this.baseUrl+'/api-beds', { responseType: 'json' }); 
    //return this.httpClient.get<Cama[]>(this.baseUrl+'/api-beds');

    // return of([ 
    //     //{id: 1, descripcion: 'Hydrogen', estadoCama: {id: 1, descripcion: "ejemplo"}, tipoCama: {id: 1, descripcion: "ejemplo"}},
    //     {id: 1, descripcion: 'UTI', estadoCama: "Fuera de linea", tipoCama: "Crítica", subTipo: "Adulto"}, 
    //     {id: 2, descripcion: 'UTI', estadoCama: "Reparacion", tipoCama: "Crítica", subTipo: "Adulto"}, 
    //     {id: 3, descripcion: 'UTI', estadoCama: "Reservada", tipoCama: "Crítica", subTipo: "Adulto"}, 
    //     {id: 4, descripcion: 'UTI', estadoCama: "Reservada", tipoCama: "Crítica", subTipo: "Adulto"}, 
    //     {id: 5, descripcion: 'UTI', estadoCama: "Libre", tipoCama: "Crítica", subTipo: "Neonatología"}, 
    //     {id: 6, descripcion: 'General', estadoCama: "Potencialmente disponible", tipoCama: "General", subTipo: "Neonatología"}, 
    //     {id: 7, descripcion: 'UTI', estadoCama: "Potencialmente disponible", tipoCama: "Crítica", subTipo: "Pediátrico"}  , 
    //     {id: 8, descripcion: 'General', estadoCama: "Ocupada", tipoCama: "General", subTipo: "Pediátrico"}  
    // ]);
  }

  getTipoCama(): Observable<TipoCama[]>{ 
    //return this.httpClient.get<TipoCama[]>(this.baseUrl);
    return of([
      {"id": 1,"descripcion": "Crítica" },
      {"id": 2,"descripcion": "General" }
    ]);
  }
  getEstadoCama(): Observable<EstadoCama[]>{ 
    //return this.httpClient.get<EstadoCama[]>(this.baseUrl);
    return of([
      {"id": 1,"descripcion": "Libre" },
      {"id": 2,"descripcion": "Ocupada" },
      {"id": 3,"descripcion": "Fuera de linea" },
      {"id": 4,"descripcion": "Reparacion" },
      {"id": 5,"descripcion": "Reservada" },
      {"id": 6,"descripcion": "Potencialmente disponible" }
    ]);
  } 
}