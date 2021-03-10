import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ListNoteComponent } from './Components/notes/components/list/list.component';
import { AddNoteComponent } from './Components/notes/components/add/add.component';
import { BranchesComponent } from './Components/branches/list/list.component';
import { AddBranchComponent} from './Components/branches/add/add.component';
import { ListRoleComponent } from './Components/roles/list/list.component';
import { AddRoleComponent } from './Components/roles/add/add.component';


const routes: Routes = [
  { path: 'notes', component: ListNoteComponent },
  { path: 'edit-note', component: AddNoteComponent },
  { path: 'edit-note/:id', component: AddNoteComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'add-branch', component: AddBranchComponent },
  { path: 'edit-branch/:id', component: AddBranchComponent },
  { path: 'roles', component: ListRoleComponent },
  { path: 'edit-role', component: AddRoleComponent },
  { path: 'edit-role/:id', component: AddRoleComponent },

];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
