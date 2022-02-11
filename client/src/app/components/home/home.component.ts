import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SigninComponent } from 'src/app/components/login/signin/signin.component';
import { ServiciosPorCategoriaComponent } from 'src/app/components/servicio/servicios-por-categoria/servicios-por-categoria.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bsModalRef?: BsModalRef;

  categorias: Categoria[] = [];

  categoriasQuery: any;
  categoriasSubscription: any;

  contratosRealizados: number = 0;
  contratistasRegistrados: number = 0;
  prestadoresRegistrados: number = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: BsModalService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.suscribeCategorias();
  }

  ngOnDestroy(): void {
    this.unsuscribeCategorias();
  }

  suscribeCategorias(): void {
    this.categoriasQuery = this.categoriaService.categorias();
    this.categoriasSubscription = this.categoriasQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.categorias;
      })
    ).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => console.log(err)
    );
  }

  unsuscribeCategorias(): void {
    this.categoriasSubscription.unsubscribe();
  }

  openSigninModal(goTo: string, navigationExtras: NavigationExtras = {}): void {
    const initialState = {
      goTo,
      navigationExtras
    };
    this.bsModalRef = this.modalService.show(SigninComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  goToServicios() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/servicios/']);
    } else {
      this.openSigninModal('servicios');
    }
  }

  publicarServicio() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        showPublicarServicio: true
      }
    }
    if (this.authService.loggedIn()) {
      this.router.navigate(['/servicios/'], navigationExtras);
    } else {
      this.openSigninModal('servicios', navigationExtras);
    }
  }

  goToServiciosPorCategoria(idCategoria: string) {
    const initialState = {
      idCategoria
    };
    this.bsModalRef = this.modalService.show(ServiciosPorCategoriaComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
