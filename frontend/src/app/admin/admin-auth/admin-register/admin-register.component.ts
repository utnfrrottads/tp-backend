import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-admin',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class RegisterAdminComponent  {

  public formSubmitted = false;
  public registerForm : FormGroup;
  
  constructor(private fb: FormBuilder,
              private validator : ValidatorService ,
              private router: Router,
              private userService: UserService) {
    this.createRegisterForm();
    this.validateCheck()
   }

  get pass2Valid(){
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value
    return (pass1 === pass2)?false:true;
  }
  createRegisterForm(){
    this.registerForm = this.fb.group({
      name:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required, Validators.email]],
      address:["",[Validators.required]],
      phone:["",[Validators.required]],
      password:["",[Validators.required]],
      password2:["",[Validators.required]],
      terms:[false,[Validators.required]]
    },{validators:this.validator.passEqual("password","password2")})
  }

   createUser(){
    this.formSubmitted = true;
     if(this.registerForm.invalid){
       Object.values(this.registerForm.controls).forEach(control=>{
         control.markAsTouched();
       });
       return;
     }
      this.userService.signUp(this.registerForm.value, 'CENTER-ADMIN')
                          .subscribe(resp =>{
                           Swal.fire({
                             title: 'Administrador de cancha Registrado',
                             icon: "success",
                             timer: 2000,
                             showConfirmButton:false,
                             allowOutsideClick: false
                           });
                           setTimeout(() => {
                             this.router.navigateByUrl('/admin/login')
                           }, 2000);
                         },(err)=>{
                           Swal.fire('Error en el registro',err.error.msg,'error')
                         })
  }

  fieldInvalid(field:string){
    return this.registerForm.get(field).invalid && this.registerForm.get(field).touched
  }
  validateCheck(){
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

}
