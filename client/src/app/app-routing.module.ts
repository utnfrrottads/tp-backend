import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

import { PerfilComponent } from "./components/perfil/perfil.component";
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { ServicesPanelComponent } from "./components/services-panel/services-panel.component";
import { IndexComponent } from './components/index/index.component';
import {PublicarServicioComponent} from './components/publicar-servicio/publicar-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'services-panel',
    component: ServicesPanelComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'publicar-servicio',
    component: PublicarServicioComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
