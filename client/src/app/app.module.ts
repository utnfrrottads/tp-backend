import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { TokenInterceptorService } from './services/token-interceptor.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { ServicesPanelComponent } from './components/servicio/services-panel/services-panel.component';
import { ServicesSidebarComponent } from './components/servicio/services-sidebar/services-sidebar.component';
import { ServiceCardComponent } from './components/servicio/service-card/service-card.component';
import { PublicarServicioComponent } from './components/servicio/publicar-servicio/publicar-servicio.component';
import { ListCategoriasComponent } from './components/categoria/list-categorias/list-categorias.component';
import { UpdateCategoriaComponent } from './components/categoria/update-categoria/update-categoria.component';
import { ListNivelesComponent } from './components/nivel/list-niveles/list-niveles.component';
import { UpdateNivelComponent } from './components/nivel/update-nivel/update-nivel.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { CambiarClaveComponent } from './components/usuario/cambiar-clave/cambiar-clave.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    PerfilComponent,
    CambiarClaveComponent,
    ServicesPanelComponent,
    ServicesSidebarComponent,
    ServiceCardComponent,
    PublicarServicioComponent,
    ListCategoriasComponent,
    UpdateCategoriaComponent,
    ListNivelesComponent,
    UpdateNivelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpLinkModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: environment.API_URL }) as any,
      cache: new InMemoryCache() as any,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });
  }
}
