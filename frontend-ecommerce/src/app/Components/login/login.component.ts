import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {UserService} from '../../Services/user.service'
import { ToastrService } from 'ngx-toastr'

declare var $: any;
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  
  currentUser: any;
  message = '';
  validations = true;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { 
    var string = localStorage.getItem('CurrentUser') || JSON.stringify(new User());
    this.currentUser = JSON.parse(string)
    console.log(this.currentUser)
  }
  
  ngOnInit(): void {
  }

  logoutUser() {
    this.currentUser = null
    this.userService.logoutUser()
  }

  loginUser(username: string, password: string, form: NgForm){
    this.validations = true

    if( username.length == 0 || password.length == 0 ) {
      this.toastr.error("Ingrese todos los datos necesarios.", "Error")
      this.validations = false
    }
    
    if(this.validations){
      this.userService.loginUser(username, password).subscribe({
          next: (res) => {
            this.currentUser = res as User
            localStorage.setItem('CurrentUser', JSON.stringify(this.currentUser))
            window.location.reload()  
          },
          error: (err) => {
            if(JSON.stringify(err).includes("error")){
              form.reset();
              this.toastr.error(JSON.parse(JSON.stringify(err)).error.error, "Error");
            }
          }
      })
    }
  }
}
