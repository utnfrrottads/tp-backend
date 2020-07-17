import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CartaRubroComponent } from './components/carta-rubro/carta-rubro.component';
import { ListaRubrosComponent} from './components/lista-rubros/lista-rubros.component';

import { CardListComponent } from './components/card-list/card-list.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';

//para los componentes de angular material.
import {AngularMaterialModule} from './angular-material/angular-material.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CarritoItemComponent } from './components/carrito-item/carrito-item.component';
import { SubirProductoComponent } from './components/subir-producto/subir-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CartaRubroComponent,
    ListaRubrosComponent,

    CardListComponent,
    ProductsContainerComponent,

    ProfileComponent,

    ProductDetailComponent,

    CarritoComponent,

    CarritoItemComponent,

    SubirProductoComponent
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
