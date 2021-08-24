import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriasComponent } from './components/categoria/list-categorias/list-categorias.component';
import { ListNivelesComponent } from './components/nivel/list-niveles/list-niveles.component';
import { ServicesPanelComponent } from './components/servicio/services-panel/services-panel.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ServiciosPublicadosComponent } from './components/servicio/servicios-publicados/servicios-publicados.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ServicesPanelComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'serviciosPublicados',
    component: ServiciosPublicadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'niveles',
    component: ListNivelesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'categorias',
    component: ListCategoriasComponent,
    canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
