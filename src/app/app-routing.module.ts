import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dashboard/dash/dash.component';
import { BedComponent } from './bed/components/bed/bed.component';
import { PersonComponent } from './person/components/person/person.component';
import { EmergencyComponent } from './emergency/components/emergency/emergency.component';
import { MapEmergenciaComponent } from './emergency/components/map-emergencia/map-emergencia.component';
import { MapTomtomComponent } from './emergency/components/map-tomtom/map-tomtom.component';
import { HealthInsuranceComponent } from './health-insurance/components/health-insurance/health-insurance.component';
import { HospitalComponent } from './hospital/components/hospital/hospital.component';
import { EmergencyHomeComponent } from './emergency/components/emergency-home/emergency-home.component';
import { AccidentDiseasesComponent } from './accident-diseases/components/accident-diseases/accident-diseases.component';

const routes: Routes = [
  {path: 'tratamientos', component: AccidentDiseasesComponent },
  {path: 'dashboard', component: DashComponent },
  {path: 'camas', component: BedComponent },
  {path: 'obrassociales', component: HealthInsuranceComponent },
  {path: 'personas', component: PersonComponent },
  {path: 'hospitales', component: HospitalComponent },
  {path: 'emergencia', component: EmergencyHomeComponent },
  {path: 'emergenciaInmediata', component: EmergencyComponent },
  {path: 'mapEmergencia', component: MapEmergenciaComponent },
  {path: 'mapDispatcher', component: MapTomtomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
