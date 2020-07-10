import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';

//para los componentes de angular material.
import {AngularMaterialModule} from './angular-material/angular-material.module';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
