import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modules
import { AppRoutingModule } from './app.routing.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";

//Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AdminModule } from './admin/admin.module';
import { LoginAdminComponent } from './admin/admin-auth/admin-login/admin-login.component';
import { RegisterAdminComponent } from './admin/admin-auth/admin-register/admin-register.component';





@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,  
    LoginComponent,
    RegisterComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PagesModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
