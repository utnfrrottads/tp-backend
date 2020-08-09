import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  form : FormGroup;

  constructor(private fb: FormBuilder,
              private authService : AuthService,
              private router : Router) { 
    this.createForm()

  }

  createForm(){
    this.form = this.fb.group({
      email:["valentinferaudo@gmail.com",[Validators.required,
                                          Validators.email],],
      password:["123456789",Validators.required],
      remember:[false,,]
    })
  }



  signIn(){
    this.authService.signIn(this.form.value)
                      .subscribe(resp =>{
                        console.log(resp)
                        if(this.form.get('remember').value){
                          localStorage.setItem('email',this.form.get('email').value)
                        }else{
                          localStorage.removeItem('email')
                        }
                        this.router.navigateByUrl('/home')
                      },(err)=>{
                        console.log(err)
                        Swal.fire('Email y/o contraseña incorrectos','Por favor, ingrese nuevamente sus datos','error')
                      })
  }

}
