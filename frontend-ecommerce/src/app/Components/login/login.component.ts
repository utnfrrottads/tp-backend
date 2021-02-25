import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../../Services/user.service'

declare var $: any;
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  message = '';
  validations = true;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
  }

  loginUser(username: string, password: string, form: NgForm){
    document.getElementById('errorAlert')?.setAttribute("style", "visibility=false")

    if( username == "" || password == "" ) {
      this.message= "Ingrese todos los datos necesarios."
      this.validations = false
      console.log("in")
      document.getElementById('errorAlert')?.setAttribute("style", "visibility=visible")  
    }
    
    if(this.validations){
      this.userService.loginUser(username, password).subscribe(res => {
      console.log(JSON.parse(JSON.stringify(res)))
      }, 
      (err) => {
        console.log("iner")
        if( JSON.stringify(err).includes("error")){
          form.reset();
          this.message = JSON.parse(JSON.stringify(err)).error.error
          // $('#alert').show()
        }
      })
    }
  }

}
