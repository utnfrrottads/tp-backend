import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCardComponent } from './field-card/field-card.component';
import { PipesModule } from '../pipes/pipes.module';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoAppointmentTableComponent } from './do-appointment-table/do-appointment-table.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    FieldCardComponent,
    AppointmentTableComponent,
    UserSettingComponent,
    DoAppointmentTableComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent

  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    ChartsModule
    
  ],
  exports:[
    FieldCardComponent,
    AppointmentTableComponent,
    UserSettingComponent,
    DoAppointmentTableComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent
  ]
})
export class ComponentsModule { }
