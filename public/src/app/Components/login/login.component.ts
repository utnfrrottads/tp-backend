import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {UserService} from '../../Services/user.service'
import { ToastrService } from 'ngx-toastr'

declare let $: any;
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent {

  
  currentUser: any;
  message = '';
  
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private toastr: ToastrService, 
    private userService: UserService, 
    private router: Router) { 
    this.currentUser = userService.getCurrentUser();
  }

  logoutUser() {
    this.currentUser = null
    this.userService.logoutUser()
  }

  onSubmit(){

    if (!this.loginForm.valid){
      this.toastr.error('Ingrese todos los datos necesarios.', 'Error')
      return;
    }

    const formValue = this.loginForm.value;

    this.userService.loginUser(formValue.username, formValue.password).subscribe({
        next: (res) => {
          this.currentUser = res as User
          localStorage.setItem('CurrentUser', JSON.stringify(this.currentUser))
          window.location.reload()  
        },
        error: (err) => {
          if(JSON.stringify(err).includes('error')){
            this.loginForm.reset();
            this.toastr.error(JSON.parse(JSON.stringify(err)).error.error, 'Error');
          }
        }
    });
  }
}
