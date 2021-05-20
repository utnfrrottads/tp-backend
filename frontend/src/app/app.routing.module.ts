import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { PagesComponent } from './pages/pages.component';

import { PagesRoutes } from './pages/pages.routing';
import { AdminRoutes } from './admin/admin.routing';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './admin/admin-auth/admin-login/admin-login.component';
import { RegisterAdminComponent } from './admin/admin-auth/admin-register/admin-register.component';


const routes: Routes = [
  {path: '', component: PagesComponent, children: PagesRoutes},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  {path: 'admin/register', component: RegisterAdminComponent},
  {path: 'admin', component: AdminComponent, children: AdminRoutes },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }
