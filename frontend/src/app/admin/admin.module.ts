import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppRoutingModule } from '../app.routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { AdminComponent } from './admin.component';
import { FieldsComponent } from './admin-pages/admin-fields/admin-fields.component';
import { FieldComponent } from './admin-pages/admin-field/admin-field.component';
import { SettingComponent } from './admin-pages/admin-setting/admin-setting.component';
import { AdminHomeComponent } from './admin-pages/admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AdminAppointmentsComponent } from './admin-pages/admin-appointments/admin-appointments.component';
import { AdminDoAppointmentsComponent } from './admin-pages/admin-do-appointments/admin-do-appointments.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    AdminComponent,
    FieldsComponent,
    FieldComponent,
    SettingComponent,
    AdminHomeComponent,
    AdminAppointmentsComponent,
    AdminDoAppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    AdminComponent,
    FieldsComponent,
    FieldComponent,
    SettingComponent
  ]
})
export class AdminModule { }
