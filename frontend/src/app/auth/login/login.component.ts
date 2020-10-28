import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  form : FormGroup;

  constructor(private fb: FormBuilder,
              private userService : UserService,
              private router : Router) { 
    this.createForm()

  }

  createForm(){
    this.form = this.fb.group({
      email:[localStorage.getItem('email')||"",[Validators.required,
                                          Validators.email],],
      password:["",Validators.required],
      remember:[false,,]
    })
  }



  signIn(){
    this.userService.signIn(this.form.value,'USER')
                      .subscribe(resp =>{
                        if(this.form.get('remember').value){
                          localStorage.setItem('email',this.form.get('email').value)
                        }else{
                          localStorage.removeItem('email')
                        }
                        Swal.fire({
                          title: 'Ingresando',
                          icon: "success",
                          timer: 2000,
                          showConfirmButton:false,
                          allowOutsideClick: false
                        });
                        setTimeout(() => {
                          this.router.navigateByUrl('')
                        }, 2000);
                      },(err)=>{
                        console.log(err)
                        Swal.fire('Email y/o contraseña incorrectos','Por favor, ingrese nuevamente sus datos','error')
                      })
  }

}
