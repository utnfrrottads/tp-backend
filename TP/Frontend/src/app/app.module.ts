import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CartaRubroComponent } from './components/carta-rubro/carta-rubro.component';
import { ListaRubrosComponent } from './components/lista-rubros/lista-rubros.component';

import { CardListComponent } from './components/card-list/card-list.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { ListaEmpresasComponent } from './components/lista-empresas/lista-empresas.component';
import { DetalleEmpresaComponent } from './components/detalle-empresa/detalle-empresa.component';
import { CartaEmpresaComponent } from './components/carta-empresa/carta-empresa.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SubirProductoComponent } from './components/subir-producto/subir-producto.component';
import { LoginComponent } from './components/login/login.component';

import { DialogoComponent } from './components/dialogo/dialogo.component';
import { CarritoItemsComponent } from './components/carrito-items/carrito-items.component';
import { CarritoConfirmComponent } from './components/carrito-confirm/carrito-confirm.component';
import { ComprasVentasListComponent } from './components/compras-ventas-list/compras-ventas-list.component';
import { DialogCompraVentaComponent } from './components/dialog-compra-venta/dialog-compra-venta.component';
import { DialogFinishVentaComponent } from './components/dialog-finish-venta/dialog-finish-venta.component';


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
    FooterComponent,
    ListaEmpresasComponent,
    DetalleEmpresaComponent,
    CartaEmpresaComponent,
    CarritoComponent,
    SubirProductoComponent,
    LoginComponent,
    DialogoComponent,
    CarritoItemsComponent,
    CarritoConfirmComponent,
    ComprasVentasListComponent,
    DialogCompraVentaComponent,
    DialogFinishVentaComponent,
    
    
  ],
  entryComponents: [DialogCompraVentaComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
