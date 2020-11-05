import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class LoginCreationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  tipoUsuario = 'particular';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    pass: ['', [Validators.required, Validators.minLength(6)]],
    nombre: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    cuil: [''],
    direccion: [''],
    localidad: [''],
    passRepeat: [''],
    telefono: [''],
  });

  ngOnInit(): void {}

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
            this.router.navigate(['login']);
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
