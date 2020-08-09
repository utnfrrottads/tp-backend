import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FieldsComponent } from './fields/fields.component';


const routes : Routes = [
    {path:'home',component:PagesComponent,
    children:[
      {path:'', component:HomeComponent},
      {path:'users', component:UsersComponent},
      {path:'appointments', component:AppointmentsComponent},
      {path:'fields', component:FieldsComponent}
    ]},
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule{}