import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SigninComponent } from 'src/app/components/login/signin/signin.component'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bsModalRef?: BsModalRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
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

  goToServiciosPorCategoria() {
    this.router.navigate(['/servicios-por-categoria/'])
  }
}
