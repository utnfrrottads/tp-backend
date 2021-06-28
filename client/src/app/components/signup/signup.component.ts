import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as bootstrap from "bootstrap"

import { AuthService } from "../../services/auth.service";

import { Usuario } from "../../models/Usuario";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  usuario: Usuario = {
    idUsuario: '',
    nombreUsuario: '',
    clave: '',
    nombreApellido: '',
    email: '',
    habilidades: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.usuario).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.data.signUp);
        localStorage.setItem('nombreUsuario', this.usuario.nombreUsuario || '');

        $("#signUpPopup").modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        this.router.navigate(['/']);
      },
      (err: any) => console.log(err)
    );
  }

}
