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
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    cuil: new FormControl(''),
    direccion: new FormControl(''),
    localidad: new FormControl(''),
    passRepeat: new FormControl(''),
    telefono: new FormControl(''),
  });

  creationMode: boolean = false;

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
          this.showSnack(
            'Usuario o contraseña incorrecta. Intente otra vez',
            '¡Entendido!'
          );
        }
      });
  }

  createUser() {
    if (
      this.loginForm.controls.pass.value ===
      this.loginForm.controls.passRepeat.value
    ) {
      this.userService
        .createUser(this.loginForm.controls, this.tipoUsuario)
        .subscribe((res: any) => {
          if (res.status === 'ok') {
            this.showSnack(
              'Cuenta creada con exito, Intente logearse',
              '¡Entendido!'
            );
            this.toggleMode();
            this.loginForm.patchValue({
              pass: '',
            });
          } else {
            this.showSnack(res.error, '¡Entendido!');
          }
        });
    } else {
      this.showSnack('Las contraseñas no coinciden', '¡Entendido!');
    }
  }

  showSnack(texto, opcion) {
    this._snackBar.open(texto, opcion, {
      duration: 3500,
    });
  }
}
