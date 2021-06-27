import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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
    console.log(this.usuario);
    this.authService.signUp(this.usuario).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.data.signUp);
        localStorage.setItem('nombreUsuario', this.usuario.nombreUsuario || '');
        this.router.navigate(['/']);
      },
      (err: any) => console.log(err)
    );
  }

}
