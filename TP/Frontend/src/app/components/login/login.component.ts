import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  tipoUsuario = 'particular';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),

    email: new FormControl('', [Validators.email, Validators.required]),
    cuil: new FormControl(''),
    direccion: new FormControl(''),
    localidad: new FormControl(''),
    pass_repeat: new FormControl(''),
    telefono: new FormControl(''),
  });

  creationMode: boolean = true;

  ngOnInit(): void {}

  toggleMode() {
    this.creationMode = !this.creationMode;
  }

  login() {
    this.userService
      .login(this.loginForm.value.username, this.loginForm.value.pass)
      .subscribe((res: any) => {
        if (res.user.length !== 0) {
          // Guardo los datos del usuario excepto la password
          res.user[0].pass = '******';
          localStorage.setItem('user', JSON.stringify(res.user[0]));
          this.router.navigate(['rubros']);
        } else {
          this._snackBar.open(
            'Usuario o contraseña incorrecta. Intente otra vez',
            '¡Entendido!',
            {
              duration: 3500,
            }
          );
        }
      });
  }
}
