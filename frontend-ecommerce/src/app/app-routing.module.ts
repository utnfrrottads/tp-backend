import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ListNoteComponent } from './Components/notes/components/list/list.component';
import { AddNoteComponent } from './Components/notes/components/add/add.component';
import { BranchesComponent } from './Components/branches/list/list.component';
import { AddBranchComponent} from './Components/branches/add/add.component';
import { ListRoleComponent } from './Components/roles/list/list.component';
import { AddRoleComponent } from './Components/roles/add/add.component';
import { ListProductComponent } from './Components/products/list/list.component';
import { AddProductComponent } from './Components/products/add/add.component';
import { UsersComponent } from './Components/users/list/list.component';
import { AddUserComponent } from './Components/users/add/add.component';
import { ArticlesComponent } from './Components/articles/list/list.component';
import { AddArticleComponent } from './Components/articles/add/add.component';
import { MarketComponent } from './Components/market/market.component';
import { MainComponent } from './Components/main/main.component';
import { CompleteSaleComponent } from './Components/complete-sale/complete-sale.component'
import { MyBuysComponent } from './Components/my-buys/my-buys.component'
import { ProfileComponent } from './Components/profile/profile.component';

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
  { path: 'product', component: ListProductComponent },
  { path: 'edit-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: AddProductComponent },
  { path: 'users', component: UsersComponent },
  { path: 'edit-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: AddUserComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'edit-article/:id', component: AddArticleComponent },
  { path: 'market', component: MarketComponent},
  { path: '', component: MainComponent},
  { path: 'finish-sale', component: CompleteSaleComponent},
  { path: 'buys', component: MyBuysComponent},
  { path: 'profile', component: ProfileComponent},
  
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
