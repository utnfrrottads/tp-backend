import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Rubro } from './model/rubros';
import { ListaRubrosComponent } from './components/lista-rubros/lista-rubros.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { ProductCardsService } from './services/product-cards.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ListaEmpresasComponent } from './components/lista-empresas/lista-empresas.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SubirProductoComponent } from './components/subir-producto/subir-producto.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  
  { path:'rubros',component: ListaRubrosComponent},
  { path:'rubros/productos',component: ProductsContainerComponent},
  { path:'rubros/empresas',component: ListaEmpresasComponent},
  { path: 'rubros/empresas/:idEmpresa', component:ProductsContainerComponent},
  { path:'rubros/:idRubro',component: ProductsContainerComponent},
  { path:'rubros/productos/:idProducto',component: ProductDetailComponent},
  { path:'rubros/productos/search/:searchKey',component: ProductsContainerComponent},
  { path:'profile', component: ProfileComponent}, 
  { path: 'carrito', component: CarritoComponent},
  { path: 'publicar', component: SubirProductoComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component:PageNotFoundComponent},
  { path:'', redirectTo:'rubros', pathMatch: 'full'},
  { path:'**',redirectTo:'rubros'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

