import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';
import { ComponentsModule } from '../components/components.module';


//Componentes
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FieldsComponent } from './fields/fields.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { FieldComponent } from './field/field.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    AppointmentsComponent,
    PagesComponent,
    FieldsComponent,
    UsersComponent,
    FieldComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
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
