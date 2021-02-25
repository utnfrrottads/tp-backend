import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { NotesComponent } from './Components/notes/notes.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
