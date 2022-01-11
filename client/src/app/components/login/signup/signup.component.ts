import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) { }

  signUp(event: any): void {
    event.preventDefault();
    this.authService.signUp(this.usuario).subscribe(
      (res: any) => {
        this.errorMessage = '';

        localStorage.setItem('usuario', JSON.stringify(res.data.signUp.usuario));
        localStorage.setItem('nombreUsuario', res.data.signUp.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.signUp.token);

        this.bsModalRef.hide();

        this.router.navigate(['']);
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
