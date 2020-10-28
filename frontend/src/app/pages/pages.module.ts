import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';
import { ComponentsModule } from '../components/components.module';


//Components
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FieldsComponent } from './fields/fields.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { DoAppointment } from './do-appointments/do-appointments.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [
    HomeComponent,
    AppointmentsComponent,
    PagesComponent,
    FieldsComponent,
    UsersComponent,
    DoAppointment,
    AboutComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
    
  ],
  exports:[
    HomeComponent,
    AppointmentsComponent,
    FieldsComponent,
    PagesComponent,
    UsersComponent,
    
    
  ]
})
export class PagesModule { }
