import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Usuario } from '../../models/Usuario';

declare var $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  usuario: Usuario = {
    idUsuario: '',
    nombreUsuario: '',
    clave: ''
  };
  error = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.authService.signIn(this.usuario).subscribe(
      (res: any) => {
        this.error = false;
        this.errorMessage = '';

        localStorage.setItem('user', JSON.stringify(res.data.signIn.user));
        localStorage.setItem('token', res.data.signIn.token);

        /* $('#signInPopup').modal('hide'); */
        /* $('body').removeClass('modal-open'); */
        /* $('.modal-backdrop').remove(); */

        this.router.navigate(['/']);
      },
      (err: any) => {
        this.error = true;
        this.errorMessage = err.message;
      }
    );
  }
}
