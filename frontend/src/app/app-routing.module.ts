import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from "./components/clients/client/client.component";
import { AddClientComponent } from "./components/clients/add-client/add-client.component";
import { EditClientComponent } from "./components/clients/edit-client/edit-client.component";
import { ArticleComponent } from "./components/articles/article/article.component";
import { ArticleDataComponent } from './components/articles/article-data/article-data.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/suppliers/edit-supplier/edit-supplier.component';
import { AddPurchaseComponent } from './components/purchases/add-purchase/add-purchase.component';
import { PurchaseComponent } from './components/purchases/purchase/purchase.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    component: ClientComponent
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
    path: 'articles/addArticle/:id',
    component: AddArticleComponent
  },
  {
    path: 'suppliers',
    component: SupplierComponent
  },
  {
    path: 'suppliers/addSupplier', 
    component: AddSupplierComponent
  },
  {
    path: 'suppliers/edit-supplier/:id',
    component: EditSupplierComponent
  },
  {
    path: 'purchases/newPurchase',
    component: AddPurchaseComponent
  },
  {
    path: 'purchases',
    component: PurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
