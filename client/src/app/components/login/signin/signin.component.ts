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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  signIn(event: any): void {
    event.preventDefault();
    this.authService.signIn(this.usuario).subscribe(
      (res: any) => {
        this.errorMessage = '';

        localStorage.setItem('usuario', JSON.stringify(res.data.signIn.usuario));
        localStorage.setItem('nombreUsuario', res.data.signIn.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.signIn.token);

        this.router.navigate(['']);
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
