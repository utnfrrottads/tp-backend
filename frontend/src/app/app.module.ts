import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";

import { AppComponent } from './app.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';

import { HttpClientModule } from "@angular/common/http";
import { ArticleComponent } from "./components/articles/article/article.component";
import { ArticleDataComponent } from './components/articles/article-data/article-data.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AddClientComponent,
    EditClientComponent,
    ArticleComponent,
    ArticleDataComponent,
    AddArticleComponent,
    SupplierComponent,
    AddSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
