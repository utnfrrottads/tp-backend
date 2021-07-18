import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { IndexComponent } from './components/index/index.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { CambiarClaveComponent } from './components/usuario/cambiar-clave/cambiar-clave.component';
import { ListCategoriasComponent } from './components/categoria/list-categorias/list-categorias.component';
import { UpdateCategoriaComponent } from './components/categoria/update-categoria/update-categoria.component';
import { ListNivelesComponent } from './components/nivel/list-niveles/list-niveles.component';
import { UpdateNivelComponent } from './components/nivel/update-nivel/update-nivel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    IndexComponent,
    PerfilComponent,
    CambiarClaveComponent,
    ListCategoriasComponent,
    UpdateCategoriaComponent,
    ListNivelesComponent,
    UpdateNivelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
      cache: new InMemoryCache() as any,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });
  }
}
