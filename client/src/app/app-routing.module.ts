import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriasComponent } from './components/categoria/list-categorias/list-categorias.component';
import { ListNivelesComponent } from './components/nivel/list-niveles/list-niveles.component';
import { ServiciosComponent } from './components/servicio/servicios/servicios.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { VerPerfilComponent } from './components/usuario/ver-perfil/ver-perfil.component';
import { ServicioComponent } from './components/servicio/servicio/servicio.component';
import { ServiciosPublicadosComponent } from './components/servicio/servicios-publicados/servicios-publicados.component';
import { ServiciosContratadosComponent } from './components/contrato/servicios-contratados/servicios-contratados.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil/:usuario',
    component: VerPerfilComponent,
  },
  {
    path: 'servicio/:idServicio',
    component: ServicioComponent,
  },
  {
    path: 'serviciosContratados',
    component: ServiciosContratadosComponent,
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
