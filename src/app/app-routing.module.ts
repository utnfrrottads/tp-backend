import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dashboard/dash/dash.component';
import { CamaComponent } from './cama/components/cama/cama.component';
import { PersonComponent } from './person/components/person/person.component';
import { MapComponent } from './emergency/map/map.component';
import { MapEmergenciaComponent } from './emergency/map-emergencia/map-emergencia.component';
import { MapTomtomComponent } from './emergency/map-tomtom/map-tomtom.component';
import { HealthInsuranceComponent } from './health-insurance/components/health-insurance/health-insurance.component';
import { HospitalComponent } from './hospital/components/hospital/hospital.component';

const routes: Routes = [
  {path: 'dashboard', component: DashComponent },
  {path: 'camas', component: CamaComponent },
  {path: 'obrassociales', component: HealthInsuranceComponent },
  {path: 'personas', component: PersonComponent },
  {path: 'hospitales', component: HospitalComponent },  
  {path: 'emergencia', component: MapComponent },  
  {path: 'mapEmergencia', component: MapEmergenciaComponent },
  {path: 'mapDispatcher', component: MapTomtomComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
