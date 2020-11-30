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
import { ComprasVentasListComponent } from './components/compras-ventas-list/compras-ventas-list.component';
import { LoginCreationComponent } from './components/login-creation/login-creation.component';
import { ProductsResolverService } from './services/products-resolver.service';

const routes: Routes = [
  { path: 'rubros', component: ListaRubrosComponent },
  { path: 'rubros/productos', component: ProductsContainerComponent, 
    resolve: {products: ProductsResolverService}},
  { path: 'rubros/empresas', component: ListaEmpresasComponent },
  { path: 'rubros/empresas/:idEmpresa', component: ProductsContainerComponent, 
    resolve: {products: ProductsResolverService} },
  { path: 'rubros/:idRubro', component: ProductsContainerComponent, 
    resolve: {products: ProductsResolverService} },
  { path: 'rubros/productos/:idProducto', component: ProductDetailComponent },
  {
    path: 'rubros/productos/search/:searchKey',
    component: ProductsContainerComponent,
    resolve: {products: ProductsResolverService}
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'compraventa/:type', component: ComprasVentasListComponent },
  { path: 'ventas', component: ComprasVentasListComponent },
  { path: 'compras', component: ComprasVentasListComponent },
  { path: 'publicar', component: SubirProductoComponent },
  { path: 'productos/editar/:idProducto', component: SubirProductoComponent },
  { path: 'productos/eliminar/:idProducto', component: SubirProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginCreationComponent},
  { path: '', redirectTo: 'rubros', pathMatch: 'full' },
  { path: '**', redirectTo: 'rubros' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
