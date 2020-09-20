import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dashboard/dash/dash.component';
import { CamaComponent } from './cama/components/cama.component';

const routes: Routes = [
  {path: 'dashboard', component: DashComponent},
  {path: 'camas', component: CamaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
