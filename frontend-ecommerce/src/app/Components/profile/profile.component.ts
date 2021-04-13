import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  profileForm: FormGroup;
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
    this.profileForm = this.fb.group({
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

  ngOnInit(): void {
    const currentUser = localStorage.getItem('CurrentUser');
    this.currentUser = currentUser !== null ? JSON.parse(currentUser) : new User();

    this.getRoles();
    console.log(this.currentUser);


    this.profileForm.patchValue({
      id: this.currentUser._id,
      dni: this.currentUser.dni,
      names: this.currentUser.names,
      lastNames: this.currentUser.lastNames,
      username: this.currentUser.username,
      password: this.currentUser.password,
      pc: this.currentUser.pc,
      email: this.currentUser.email,
      street: this.currentUser.street,
      number: this.currentUser.number,
      flat: this.currentUser.flat,
      phone: this.currentUser.phone,
      employee: this.currentUser.employee,
      client: this.currentUser.client,
      roles: this.currentUser.roles
    });
  }

  onSubmit() {
    const formModel = this.profileForm.value;

    if (this.profileForm.valid) {

      const profile: any = {
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
      this.userService.putUser(profile).subscribe((x: any) => {
        this.toastr.success('Perfil actualizado exitosamente!');
        localStorage.setItem('CurrentUser', JSON.stringify(x.user));
        this.goBack();
      }, error => this.showError(error));
    }
    else{
      this.toastr.error('Error al editar el perfil de usuario!');
    }
  }

  goBack() {
    this.router.navigate(['/']);
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
