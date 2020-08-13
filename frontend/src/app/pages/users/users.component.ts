import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import {  Router } from '@angular/router';
import { ValidatorService } from 'src/app/services/validator.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  {

  userForm : FormGroup;
  pass = false;
  change = false;
  user : User;

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private validator : ValidatorService,
              private route : Router) {
                this.user = this.userService.user;
                this.createForm();
  }
                            
  
  createForm(){
    this.userForm = this.fb.group({
      name:[{value:this.user.name,disabled: true},[Validators.required]],
      address:[{value:this.user.address,disabled: true},[Validators.required]],
      phone:[{value:this.user.phone,disabled: true},[Validators.required]],
      email:[{value:this.user.email,disabled: true},[Validators.required,Validators.email]],
      password:[,],
      password2:[,[]]
    },{validators: this.validator.passEqual("password","password2")})
  }
  get pass2Valid(){
    const pass1 = this.userForm.get('password').value;
    const pass2 = this.userForm.get('password2').value;
    return ( pass1 === pass2 ) ? false : true;
 }
  
  saveChanges(){
    if (this.userForm.invalid){
      Object.values(this.userForm.controls).forEach(control=>{
        control.markAsTouched();
      })
      return;
    }
    this.userService.updateUser(this.user.uid,this.userForm.value)
                      .subscribe(resp =>{
                        Swal.fire({
                          title: 'Usuario Editado',
                          icon: "success",
                          timer: 2000,
                          showConfirmButton:false,
                          allowOutsideClick: false
                        });
                        setTimeout(() => {
                          window.location.reload()
                        }, 1500);
                      },(err)=>{
                        Swal.fire('Error en el registro',err.error.msg,'error')
                      })
  }
  getFieldValid(field : string){
    return this.userForm.get(field).invalid &&
            this.userForm.get(field).touched
 }

  cancel(){
    this.pass= false;
    this.change=false;
    this.disableForm()
  }

  disableForm(){
    Object.values(this.userForm.controls).forEach(control=>{
      control.disable();})
    //this.userForm.controls['name'].disable();
  }
  cambiar(){
    this.change = !this.change
    Object.values(this.userForm.controls).forEach(control=>{
      control.enable();
    })
  }

}
