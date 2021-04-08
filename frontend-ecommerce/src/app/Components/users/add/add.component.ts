import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { RoleService } from '../../../Services/role.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddUserComponent implements OnInit{
  userForm: FormGroup;
  sendFormData: any;
  permissions = [];
  isEdit = false;
  roles =[new Role()];
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private rolesService: RoleService

  ) {
    this.userForm = this.fb.group({
      id: [''],
      dni: ['', Validators.required],
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      username: ['', Validators.required],    
      password: ['', Validators.required],  
      email: ['', [Validators.email, Validators.required]],  
      pc: ['', Validators.required],  
      street: ['', Validators.required],  
      number: ['', Validators.required],  
      flat: ['', Validators.required],  
      phone: ['', Validators.required],  
      employee: [false, Validators.required],  
      client: [false, Validators.required],  
      roles: [null, [Validators.required]],
    });
  }
  
  ngOnInit() {
    this.getRoles();
    

    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.userService.getById(params.get('id')).subscribe(user => {
          this.isEdit = true;
          this.userForm.patchValue({
            id: user._id,
            dni: user.dni,
            names: user.names,
            lastNames: user.lastNames,
            username: user.username,
            password: user.password,
            pc: user.pc,
            email: user.email,
            street: user.street,
            number: user.number,
            flat: user.flat,
            phone: user.phone,
            employee: user.employee,
            client: user.client,
            roles: user.roles
          });
        });
      }
    });
  }

  onSubmit() {
    const formModel = this.userForm.value;

    if (this.userForm.valid) {

      const user: any = {
        _id: formModel.id,
        dni: formModel.dni,
        names: formModel.names,
        lastNames: formModel.lastNames,
        username: formModel.username,
        password: formModel.password,
        email: formModel.email,
        pc: formModel.pc,
        street: formModel.street,
        number: formModel.number,
        flat: formModel.flat,
        phone: formModel.phone,
        employee: formModel.employee,
        client: formModel.client,
        roles: formModel.roles,
      };
      if (this.isEdit){
        this.userService.putUser(user).subscribe((x: any) => {
          this.toastr.success('Usuario actualizado exitosamente!');
          this.goBack();
        }, error => this.showError(error));
      }
      else {
          this.userService.postUser(user).subscribe((x: any) => {
            this.toastr.success('Usuario registrado exitosamente!');
            this.goBack();
          }, error => this.showError(error));
        }

    }
    else{
      this.toastr.error('Error al registrar el rol!');
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  getRoles() {
    this.rolesService.getAll().subscribe((roles: any) => {
      this.roles = roles;
    });
    var index = this.roles.indexOf({_id: '', name: '', description: '', permissions: ['']})
    if(index > -1){
      this.roles.slice(index, 1)
    }
  }

  showError(err: any) {
    this.toastr.error(err.error.error);
  }

}
