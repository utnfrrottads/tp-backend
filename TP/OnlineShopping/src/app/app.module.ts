import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
<<<<<<< HEAD
import { CardListComponent } from './components/card-list/card-list.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';

//para los componentes de angular material.
import {AngularMaterialModule} from './angular-material/angular-material.module';


>>>>>>> 240d3f14af0571c1fbf3d51bd0fd55084512dae8

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
<<<<<<< HEAD
    CardListComponent,
    ProductsContainerComponent
=======
    ProfileComponent
>>>>>>> 240d3f14af0571c1fbf3d51bd0fd55084512dae8
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
