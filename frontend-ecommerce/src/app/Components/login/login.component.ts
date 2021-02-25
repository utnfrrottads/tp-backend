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

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
  }
  
  loginUser(username: string, password: string, form: NgForm){
      try{

        if(username == null || password == null) {
          this.message= "Ingrese todos los datos necesarios."
          throw this.message
        }
        
        this.userService.loginUser(username, password).subscribe(res => {
          console.log(res)
        }, 
        (err) => {
          if( JSON.stringify(err).includes("error")){
            form.reset();
            this.message = JSON.parse(JSON.stringify(err)).error.error
            $('#alert').slideDown()
          }
        })
      } catch {
        $('#alert').show()
      }
  }

}
