import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, NgModel} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { UsersComponent } from './Components/users/users.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticlesComponent } from './Components/articles/articles.component';
import { ProductsComponent } from './Components/products/products.component';
import { SalesComponent } from './Components/sales/sales.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { NotesComponent } from './Components/notes/notes.component';
import { RolesComponent } from './Components/roles/roles.component';
import { AppRoutingModule } from './app-routing.module';
import { MarketComponent } from './components/market/market.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    ArticlesComponent,
    ProductsComponent,
    SalesComponent,
    BranchesComponent,
    NotesComponent,
    RolesComponent,
    MarketComponent,
    ProductItemComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
