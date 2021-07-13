import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

import { IndexComponent } from "./components/index/index.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { CategoriasComponent } from "./components/categorias/categorias.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
