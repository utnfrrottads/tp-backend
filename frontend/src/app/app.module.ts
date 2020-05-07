import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';

import { HttpClientModule } from "@angular/common/http";
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { ArticleComponent } from './components/articles/article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AddClientComponent,
    EditClientComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
