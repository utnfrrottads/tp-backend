import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from "./components/client/client.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";

const routes: Routes = [
  {
    path: 'clients',
    component: ClientComponent,
    pathMatch: 'full'
  },
  {
    path: 'clients/addClient', 
    component: AddClientComponent
  },
  {
    path: 'clients/edit-client/:id',
    component: EditClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
