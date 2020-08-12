import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldComponent } from './field/field.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from '../guards/auth.guard';


const routes : Routes = [
  {path:'',component:PagesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:HomeComponent},
    {path:'user', component:UsersComponent},
    {path:'about', component:AboutComponent},
    {path:'fields', component:FieldsComponent},
    {path:'fields/search/:search', component:FieldsComponent},
    {path:'field/:id',component: FieldComponent},
    {path:'appointments/:id', component:AppointmentsComponent},
  ]},
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule{}