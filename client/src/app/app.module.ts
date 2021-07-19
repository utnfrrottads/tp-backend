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

import { AuthGuard } from './guards/auth.guard';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexComponent } from './components/index/index.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CambiarClaveComponent } from './components/cambiar-clave/cambiar-clave.component';
import { ServicesPanelComponent } from './components/services-panel/services-panel.component';
import { ServicesSidebarComponent } from './components/services-sidebar/services-sidebar.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { WhatWeDoComponent } from './components/what-we-do/what-we-do.component';
import { WhatWeOfferComponent } from './components/what-we-offer/what-we-offer.component';
import { CommunityComponent } from './components/community/community.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PublicarServicioComponent } from './components/publicar-servicio/publicar-servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    IndexComponent,
    PerfilComponent,
    CambiarClaveComponent,
    ServicesPanelComponent,
    ServicesSidebarComponent,
    ServiceCardComponent,
    CategoriasComponent,
    WhatWeDoComponent,
    WhatWeOfferComponent,
    CommunityComponent,
    UserCardComponent,
    LandingPageComponent,
    PublicarServicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpLinkModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: environment.API_URL }) as any,
      cache: new InMemoryCache() as any
    });
  }
}
