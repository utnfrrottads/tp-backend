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
import { ChatComponent } from './components/contrato/chat/chat.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ServiciosPorCategoriasComponent } from './components/servicio/servicios-por-categorias/servicios-por-categorias.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'servicios',
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
    path: 'niveles',
    component: ListNivelesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'categorias',
    component: ListCategoriasComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'serviciosPorCategorias',
    component: ServiciosPorCategoriasComponent
  },
  {
    path: 'servicio/:idServicio',
    component: ServicioComponent,
  },
  {
    path: 'servicio/:idServicio/:idNotificacion',
    component: ServicioComponent,
  },
  {
    path: 'serviciosPublicados',
    component: ServiciosPublicadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'serviciosContratados',
    component: ServiciosContratadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contrato/mensajes/:idContrato',
    component: ChatComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
