import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from '@apollo/client/core';

import { AuthService } from './services/auth.service';

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
import { ServiciosPublicadosComponent } from './components/servicio/servicios-publicados/servicios-publicados.component';
import { ServiceDetailComponent } from './components/servicio/service-card/service-detail/service-detail.component';
import { VerPerfilComponent } from './components/usuario/ver-perfil/ver-perfil.component';
import { ServiciosContratadosComponent } from './components/contrato/servicios-contratados/servicios-contratados.component';
import { ServiciosComponent } from './components/servicio/servicios/servicios.component';
import { ServicioComponent } from './components/servicio/servicio/servicio.component';
import { TableContratosComponent } from './components/contrato/table-contratos/table-contratos.component';
import { ChatComponent } from './components/contrato/chat/chat.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './components/home/home.component';
import { ServiciosPorCategoriasComponent } from './components/servicio/servicios-por-categorias/servicios-por-categorias.component';
import { CategoriaTemplateComponent } from './components/servicio/categoria-template/categoria-template.component';
import { ServicePreviewCardComponent } from './components/servicio/categoria-template/service-preview-card/service-preview-card.component';
import { ServiciosPorCategoriaComponent } from './components/servicio/servicios-por-categoria/servicios-por-categoria.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { StarComponent } from './components/dialog/star/star.component';

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
    ServiciosPublicadosComponent,
    ServiceDetailComponent,
    VerPerfilComponent,
    ServiciosContratadosComponent,
    ServiciosComponent,
    ServicioComponent,
    TableContratosComponent,
    ChatComponent,
    HomeComponent,
    ServiciosPorCategoriasComponent,
    CategoriaTemplateComponent,
    ServicePreviewCardComponent,
    ServiciosPorCategoriaComponent,
    DialogComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpLinkModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authService: AuthService) {
    const middleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer ${authService.getToken() || null}`),
      });
      return forward(operation);
    });
    const http = httpLink.create({ uri: environment.API_URL });
    const link = middleware.concat(http);

    apollo.create({
      link,
      cache: new InMemoryCache() as any,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          pollInterval: 0,
        },
      },
    });
  }
}
