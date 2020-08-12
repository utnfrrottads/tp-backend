import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';


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
              private userService : UserService) {
                this.user = this.userService.user;
                this.createForm();
               }
                              

  
  
  createForm(){
    this.userForm = this.fb.group({
      name:[this.user.name,[Validators.required]],
      address:[this.user.address,[Validators.required]],
      phone:[this.user.phone,[Validators.required]],
      email:[this.user.email,[Validators.required,Validators.email]],
      password:[this.user.password,[Validators.required]],
      password2:[this.user.password,[Validators.required]]

    })
  }

  saveChanges(){

  }

  cancel(){
    this.pass= false;
    this.change=false;
    this.createForm();
  }
}
