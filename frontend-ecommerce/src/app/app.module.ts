import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { UsersComponent } from './Components/users/users.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticlesComponent } from './Components/articles/articles.component';
import { ProductsComponent } from './Components/products/products.component';
import { SalesComponent } from './Components/sales/sales.component';
import { BranchesComponent } from './Components/branches/list/list.component';
import { AddBranchComponent} from './Components/branches/add/add.component';
import { AppRoutingModule } from './app-routing.module';
import { ListNoteComponent } from './Components/notes/components/list/list.component';
import { AddNoteComponent } from './Components/notes/components/add/add.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarketComponent } from './Components/market/market.component';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { MainComponent } from './Components/main/main.component';
import { ListRoleComponent } from './Components/roles/list/list.component';
import { AddRoleComponent } from './Components/roles/add/add.component';

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
    AddBranchComponent,
    ListNoteComponent,
    AddNoteComponent,
    ListRoleComponent,
    AddRoleComponent,
    MarketComponent,
    ProductItemComponent,
    MainComponent
  ],
  imports: [
BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
