import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ListNoteComponent } from './Components/notes/components/list/list.component';
import { AddNoteComponent } from './Components/notes/components/add/add.component';


const routes: Routes = [
  { path: 'notes', component: ListNoteComponent },
  { path: 'edit-note', component: AddNoteComponent },
  { path: 'edit-note/:id', component: AddNoteComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
