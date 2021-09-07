import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { Usuario } from '../../../models/Usuario';

declare var $: any;

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

        $('#signInPopup').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        $('.navbar-collapse').removeClass('show');

        this.router.navigate(['']);
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
