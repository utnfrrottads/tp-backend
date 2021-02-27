import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BedListComponent } from './bed/components/bed-list/bed-list.component';
import { ConfirmationDialogComponent } from './common/components/confirmation-dialog/confirmation-dialog.component';
import { BedFormComponent } from './bed/components/bed-form/bed-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dashboard/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BedComponent } from './bed/components/bed/bed.component';
import { CardComponent } from './dashboard/card/card.component';
import { CamasByNivelChartComponent } from './dashboard/charts/camas-by-nivel-chart/camas-by-nivel-chart.component';
import { EmergenciasByTipoChartComponent } from './dashboard/charts/emergencias-by-tipo-chart/emergencias-by-tipo-chart.component';
import { AnnualCamasChartComponent } from './dashboard/charts/annual-camas-chart/annual-camas-chart.component';
import { EfectorObraSocialChartComponent } from './dashboard/charts/efector-obra-social-chart/efector-obra-social-chart.component';
import { CamasByEfectorChartComponent } from './dashboard/charts/camas-by-efector-chart/camas-by-efector-chart.component';
import { CamasTableComponent } from './dashboard/camas-table/camas-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MiniCardComponent } from './dashboard/mini-card/mini-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MapComponent } from './emergency/components/map/map.component';
import { MapEmergenciaComponent } from './emergency/components/map-emergencia/map-emergencia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapTomtomComponent } from './emergency/components/map-tomtom/map-tomtom.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HealthInsuranceComponent } from './health-insurance/components/health-insurance/health-insurance.component';
import { HealthInsuranceFormComponent } from './health-insurance/components/health-insurance-form/health-insurance-form.component';
import { HealthInsuranceListComponent } from './health-insurance/components/health-insurance-list/health-insurance-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PersonComponent } from './person/components/person/person.component';
import { PersonFormComponent } from './person/components/person-form/person-form.component';
import { PersonListComponent } from './person/components/person-list/person-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HospitalComponent } from './hospital/components/hospital/hospital.component';
import { HospitalFormComponent } from './hospital/components/hospital-form/hospital-form.component';
import { HospitalListComponent } from './hospital/components/hospital-list/hospital-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { HospitalHealthInsuranceFormComponent } from './hospital/components/hospital-health-insurance-form/hospital-health-insurance-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HospitalAccidentDiseasesFormComponent } from './hospital/components/hospital-accident-diseases-form/hospital-accident-diseases-form.component';
import { EmergencyPersonComponent } from './emergency/components/emergency-person/emergency-person.component';
import { EmergencyComponent } from './emergency/components/emergency/emergency.component';
import { AccidentDiseasesListComponent } from './accident-diseases/components/accident-diseases-list/accident-diseases-list.component';
import { AccidentDiseasesComponent } from './accident-diseases/components/accident-diseases/accident-diseases.component';
import { MatStepperModule } from '@angular/material/stepper';
import { EmergencyAccidentDiseasesComponent } from './emergency/components/emergency-accident-diseases/emergency-accident-diseases.component';
import { EmergencyHomeComponent } from './emergency/components/emergency-home/emergency-home.component';
import { AccidentDiseasesFormComponent } from './accident-diseases/components/accident-diseases-form/accident-diseases-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BedListComponent,
    ConfirmationDialogComponent,
    BedFormComponent,
    NavComponent,
    DashComponent,
    BedComponent,
    CardComponent,
    CamasByNivelChartComponent,
    EmergenciasByTipoChartComponent,
    AnnualCamasChartComponent,
    EfectorObraSocialChartComponent,
    CamasByEfectorChartComponent,
    CamasTableComponent,
    MiniCardComponent,
    MapComponent,
    MapEmergenciaComponent,
    MapTomtomComponent,
    HealthInsuranceComponent,
    HealthInsuranceFormComponent,
    HealthInsuranceListComponent,
    PersonComponent,
    PersonFormComponent,
    PersonListComponent,
    HospitalComponent,
    HospitalFormComponent,
    HospitalListComponent,
    HospitalHealthInsuranceFormComponent,
    HospitalAccidentDiseasesFormComponent,
    EmergencyPersonComponent,
    EmergencyComponent,
    AccidentDiseasesListComponent,
    AccidentDiseasesComponent,
    EmergencyAccidentDiseasesComponent,
    EmergencyHomeComponent,
    AccidentDiseasesFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatBadgeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTabsModule,
    MatStepperModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
