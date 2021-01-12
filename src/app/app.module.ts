import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CamaListComponent } from './cama/components/cama-list/cama-list.component';
import { ConfirmationDialogComponent } from './common/components/confirmation-dialog/confirmation-dialog.component';
import { CamaFormComponent } from './cama/components/cama-form/cama-form.component';
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
import { Routes, RouterModule } from '@angular/router';
import { CamaComponent } from './cama/components/cama.component';
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
import { MapComponent } from './map/components/map/map.component';
import { MapEmergenciaComponent } from './map/components/map-emergencia/map-emergencia.component'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { MapTomtomComponent } from './map/components/map-tomtom/map-tomtom.component';
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HospitalFormComponent } from './efectores/components/hospital-form/hospital-form.component';
import { HospitalListComponent } from './efectores/components/hospital-list/hospital-list.component';
import { HospitalComponent } from './efectores/components/hospital/hospital.component';

@NgModule({
  declarations: [
    AppComponent,
    CamaListComponent,
    ConfirmationDialogComponent,
    CamaFormComponent,
    NavComponent,
    DashComponent,
    CamaComponent,
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
    HospitalFormComponent,
    HospitalListComponent,
    HospitalComponent,   
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
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
