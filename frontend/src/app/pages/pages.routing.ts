import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FieldsComponent } from './fields/fields.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from '../guards/auth.guard';
import { DoAppointment } from './do-appointments/do-appointments.component';


export const PagesRoutes : Routes = [
  {path:'',pathMatch:'full', redirectTo:'home'}, 
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'user', component:UsersComponent,  canActivate:[AuthGuard]},
  {path:'about', component:AboutComponent,  canActivate:[AuthGuard]},
  {path:'fields', component:FieldsComponent,  canActivate:[AuthGuard]},
  {path:'appointments', component:AppointmentsComponent, canActivate:[AuthGuard]},
  {path:'appointment/:id',component: DoAppointment, canActivate:[AuthGuard]},
];


