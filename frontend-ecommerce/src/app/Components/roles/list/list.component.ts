import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../Services/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListRoleComponent implements OnInit {

  items: any = [];
  isMultiple = false;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.roleService.getAll().subscribe(x => {
      this.items = x;
    });
  }

  addRole() {
    this.router.navigate(['/edit-role']);
  }

  editRole(item: any) {
    this.router.navigate(['/edit-role', item._id ]);
  }

  deleteRole(item: any) {
    this.roleService.deleteRole(item._id).subscribe(x => {
      this.toastr.success('Rol eliminado');
      this.updateList();
    }, bad_request => {
      this.toastr.error(bad_request.error.error);
    })
  }
}
