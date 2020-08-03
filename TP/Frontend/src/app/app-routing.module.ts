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


const routes: Routes = [
  
  { path:'rubros',component: ListaRubrosComponent},
  { path:'rubros/productos',component: ProductsContainerComponent},
  { path:'rubros/productos/:idProducto',component: ProductDetailComponent},
  { path:'rubros/profile', component: ProfileComponent},
  { path:'rubros/empresas',component: ListaEmpresasComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'publicar', component: SubirProductoComponent},
  { path:'', redirectTo:'rubros', pathMatch: 'full'},
  { path:'**',redirectTo:'rubros'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

