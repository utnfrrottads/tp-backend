import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';
import { SigninComponent } from '../signin/signin.component';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMessage = '';
  title?: string;
  closeBtnName?: string;
  list: any[] = [];

  usuario: Usuario = {
    nombreUsuario: '',
    clave: '',
    nombreApellido: '',
    email: '',
    habilidades: ''
  };

  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { }

  openSigninModal(): void {
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(SigninComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  signUp(event: any): void {
    event.preventDefault();
    this.authService.signUp(this.usuario).subscribe(
      (res: any) => {
        this.errorMessage = '';
        this.authService.login(res.data.signUp.usuario, res.data.signUp.token);
        this.bsModalRef.hide();
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
