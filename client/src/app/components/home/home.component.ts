import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SigninComponent} from 'src/app/components/login/signin/signin.component'
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

  openSigninModal(): void {
    this.bsModalRef = this.modalService.show(SigninComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  
  goToServicios() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/servicios/']);
    } else {
      this.openSigninModal();
    }
  }

  publicarServicio() {
    if (this.authService.loggedIn()) {
      //Show publish service pop-up
      this.router.navigate(['/servicios/']);
    } else {
      this.openSigninModal();
    }
  }

  goToServiciosPorCategoria() {
    this.router.navigate(['/servicios-por-categoria/'])
  }
}
