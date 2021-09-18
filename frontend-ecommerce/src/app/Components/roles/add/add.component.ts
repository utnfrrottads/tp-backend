import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../Services/role.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddRoleComponent implements OnInit{
  roleForm: FormGroup;
  sendFormData: any;
  permissions = [];
  isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute

  ) {
    this.roleForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      permissions: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.roleService.getById(params.get('id')).subscribe(role => {
          this.isEdit = true;
          this.roleForm.patchValue({
            id: role._id,
            name: role.name,
            description: role.description,
            permissions: role.permissions
          });
        });
      }
    });
  }

  onSubmit() {
    const formModel = this.roleForm.value;

    if (this.roleForm.valid) {

      const role: any = {
        _id: formModel.id,
        name: formModel.name,
        description: formModel.description,
        permissions: formModel.permissions
      };

      if (this.isEdit){
        this.roleService.updateRole(role).subscribe({
        next: x => {
            this.toastr.success('Rol actualizado exitosamente!');
            this.goBack();
          },
        error: e => {
            this.toastr.error(e.error.error);        
        }
      });
      }
      else {
          this.roleService.addRole(role).subscribe({
            next: x => {
              this.toastr.success('Rol registrado exitosamente!');
              this.goBack();
            },
            error: e => {
              this.toastr.error(e.error.error);        
            }
        });
        }

    }
    else{
      this.toastr.error('Debe completar todos los campos.');
    }
  }

  goBack() {
    this.router.navigate(['/roles']);
  }

}
