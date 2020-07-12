import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CartaRubroComponent } from './components/carta-rubro/carta-rubro.component';
import { ListaRubrosComponent} from './components/lista-rubros/lista-rubros.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CartaRubroComponent,
    ListaRubrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
