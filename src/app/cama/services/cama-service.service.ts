import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CamaSummary } from '../models/cama';

@Injectable({
  providedIn: 'root'
})
export class CamaService {

  constructor() { }

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
}
