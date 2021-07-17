import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { Usuario } from '../../../models/Usuario';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage = '';

  usuario: Usuario = {
    nombreUsuario: '',
    clave: '',
    nombreApellido: '',
    email: '',
    habilidades: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(event: any): void {
    event.preventDefault();
    this.authService.signUp(this.usuario).subscribe(
      (res: any) => {
        this.errorMessage = '';

        localStorage.setItem('usuario', JSON.stringify(res.data.signUp.usuario));
        localStorage.setItem('nombreUsuario', res.data.signUp.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.signUp.token);

        $("#signUpPopup").modal("hide");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $(".navbar-collapse").removeClass("show");

        this.router.navigate(['/perfil']);
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }

}
