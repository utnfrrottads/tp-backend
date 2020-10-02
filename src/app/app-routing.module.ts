import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dashboard/dash/dash.component';
import { CamaComponent } from './cama/components/cama.component';
import { MapComponent } from './map/components/map/map.component';
import { MapEmergenciaComponent } from './map/components/map-emergencia/map-emergencia.component';
import { MapTomtomComponent } from './map/components/map-tomtom/map-tomtom.component';

const routes: Routes = [
  {path: 'dashboard', component: DashComponent },
  {path: 'camas', component: CamaComponent },
  {path: 'emergencia', component: MapComponent },  
  {path: 'mapEmergencia', component: MapEmergenciaComponent },
  {path: 'mapDispatcher', component: MapTomtomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
