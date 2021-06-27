import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

import { Usuario } from "../../models/Usuario";

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

  error: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.usuario).subscribe(
      (res: any) => {
        this.error = false;
        this.errorMessage = '';
        localStorage.setItem('token', res.data.signIn);
        localStorage.setItem('nombreUsuario', this.usuario.nombreUsuario || '');
        this.router.navigate(['/']);
      },
      (err: any) => {
        this.error = true;
        this.errorMessage = err.message;
      }
    );
  }

}
