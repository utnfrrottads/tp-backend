import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';


const routes : Routes = [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'',pathMatch:'full', redirectTo:'home'},
    {path:'**', component:PageNotFoundComponent},
];

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(routes),
      PagesRoutingModule,
    ],
    exports:[
      RouterModule
    ]
  })
  export class AppRoutingModule { }
  