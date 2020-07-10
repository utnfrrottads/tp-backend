import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CardListComponent,
    ProductsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
