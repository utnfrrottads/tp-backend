import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';


export interface IMyResponse{
  'status': string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

  currentUser: User;
  profileForm: FormGroup;
  sendFormData: any;
  permissions = [];
  isEdit= false;
  roles =[new Role()];
  isAdmin= false;
  currentRoles: Array<string> = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private rolesService: RoleService,
    private activatedRoute: ActivatedRoute
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
      flat: [''],  
      phone: ['', Validators.required],  
      employee: [false, Validators.required],  
      client: [false, Validators.required],  
      roles: [null],
    });

    var string = localStorage.getItem('CurrentUser') || JSON.stringify(new User());
    this.currentUser = JSON.parse(string)
}



   
  ngOnInit(): void {

    this.getRoles();


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

    this.rolesService.getRoleID("Administrador").subscribe(res => {
        var adminID = res as string
        if(this.currentUser.roles.includes(adminID)){
          this.isAdmin=true
        } else{
          this.isAdmin=false
        }
    })
    

    this.activatedRoute.queryParams.subscribe(params => {
      let mode = params['mode'];
      if(mode=="editMode"){
        this.isEdit=true
      } else{
        this.isEdit=false
      }
    });


    if(this.currentUser.employee){
      this.currentUser.roles.forEach(role => {
        this.rolesService.getById(role).subscribe(res =>{
          this.currentRoles.push(res.name)
        })
      });
   }

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
      this.userService.putUser(profile).subscribe({
        next: res => {
          this.toastr.success((res as IMyResponse).status);
          this.userService.getUser(this.currentUser).subscribe(res => {
            this.currentUser = res as User
            localStorage.setItem('CurrentUser', JSON.stringify(res as User));
          })
          this.changeMode("viewMode")
        },
        error: err => {
          this.showError(err);
        }
      });
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

  changeMode(mode: string){
    if(mode=="editMode"){
      this.router.navigate([ '/profile' ], { queryParams: {'mode': 'editMode'} })
    } else{
      this.router.navigate([ '/profile' ], { queryParams: {'mode': 'viewMode'} })
    }
  }

  showError(err: any) {
    this.toastr.error(err.error.error);
  }

}
