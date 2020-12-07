import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  tipoUsuario = 'particular';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  login(): void {
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

  showSnack(texto, opcion): void {
    this.snackBar.open(texto, opcion, {
      duration: 3500,
    });
  }
}
