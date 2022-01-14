import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

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
