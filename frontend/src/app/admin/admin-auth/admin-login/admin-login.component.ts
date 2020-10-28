import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm : FormGroup;
  constructor(private router : Router,
              private fb:FormBuilder,
              private userService: UserService) {
    this.createLoginForm();
   }

   ngOnInit(): void {
   }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || "",[Validators.required,Validators.email]],
      password: ["",Validators.required],
      remember: [false]
    })
  }
  login(){
     this.userService.signIn(this.loginForm.value,'CENTER-ADMIN')
                      .subscribe(resp =>{
                        if(this.loginForm.get('remember').value){
                          localStorage.setItem('email',this.loginForm.get('email').value)
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
                          this.router.navigateByUrl('/admin/home')
                        }, 2000);
                      },(err)=>{
                        console.log(err)
                        Swal.fire('Email y/o contraseña incorrectos','Por favor, ingrese nuevamente sus datos','error')
                      })
  }

}
