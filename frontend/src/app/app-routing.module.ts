import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from "./components/clients/client/client.component";
import { AddClientComponent } from "./components/clients/add-client/add-client.component";
import { EditClientComponent } from "./components/clients/edit-client/edit-client.component";
import { ArticleComponent } from "./components/articles/article/article.component";
import { ArticleDataComponent } from './components/articles/article-data/article-data.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';

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
  },
  {
    path: 'articles',
    component: ArticleComponent
  },
  {
    path: 'articles/articleData/:id',
    component: ArticleDataComponent
  },
  {
    path: 'articles/addArticle',
    component: AddArticleComponent
  },
  {
    path: 'suppliers',
    component: SupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
