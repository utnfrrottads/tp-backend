import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';
import { SignupComponent } from '../signup/signup.component';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  errorMessage = '';

  usuario: Usuario = {
    nombreUsuario: '',
    clave: '',
  };

  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { }

  openSignupModal(): void {
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(SignupComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  signIn(event: any): void {
    event.preventDefault();
    this.authService.signIn(this.usuario).subscribe(
      (res: any) => {
        this.errorMessage = '';
        this.authService.login(res.data.signIn.usuario, res.data.signIn.token);
        this.bsModalRef.hide();
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
