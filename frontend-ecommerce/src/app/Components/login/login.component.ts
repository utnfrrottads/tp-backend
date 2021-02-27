import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/user';
import {UserService} from '../../Services/user.service'

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

  constructor(private userService: UserService) { 
    this.currentUser = new User();
  }
  
  ngOnInit(): void {
  }

  logoutUser() {
    console.log("in")
    this.currentUser = null
    this.userService.logoutUser()
  }

  loginUser(username: string, password: string, form: NgForm){
    document.getElementById('errorAlert')?.setAttribute("style", "visibility=hidden")

    if( username == "" || password == "" ) {
      this.message= "Ingrese todos los datos necesarios."
      this.validations = false
      console.log("in")
      document.getElementById('errorAlert')?.setAttribute("style", "visibility=visible")  
    }
    
    if(this.validations){
      this.userService.loginUser(username, password).subscribe(res => {
      this.currentUser = res as User
      localStorage.setItem('CurrentUser', JSON.stringify(this.currentUser))
      console.log("ok")
      }, 
      (err) => {
        if( JSON.stringify(err).includes("error")){
          form.reset();
          this.message = JSON.parse(JSON.stringify(err)).error.error
        }
      })
    }
  }

}
