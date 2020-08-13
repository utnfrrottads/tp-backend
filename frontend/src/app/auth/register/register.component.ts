import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ValidatorService } from 'src/app/services/validator.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form: FormGroup;

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private router : Router,
              private validator : ValidatorService) {
    this.createForm()
   }

   createForm(){
     this.form = this.fb.group({
       name:["",[Validators.required]],
       address:["",[Validators.required]],
       phone:["",[Validators.required]],
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required]],
       password2:["",[Validators.required]]
     },{validators: this.validator.passEqual("password","password2")})
   }

   get pass2Valid(){
      const pass1 = this.form.get('password').value;
      const pass2 = this.form.get('password2').value;
      return ( pass1 === pass2 ) ? false : true;
   }

   getFieldValid(field : string){
      return this.form.get(field).invalid &&
              this.form.get(field).touched
   }

   signUp(){
     if (this.form.invalid){
       Object.values(this.form.controls).forEach(control=>{
         control.markAsTouched();
       })
       return;
     }
     this.userService.signUp(this.form.value)
                      .subscribe(resp =>{
                        Swal.fire({
                          title: 'Usuario Registrado',
                          icon: "success",
                          timer: 2000,
                          showConfirmButton:false,
                          allowOutsideClick: false
                        });
                        setTimeout(() => {
                          localStorage.setItem('token',resp.token)
                          this.router.navigateByUrl('')
                        }, 2000);
                      },(err)=>{
                        Swal.fire('Error en el registro',err.error.msg,'error')
                      })
   }


}
