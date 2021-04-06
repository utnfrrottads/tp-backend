import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class UsersComponent implements OnInit {

  items: any = [];
  isMultiple = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.userService.getAll().subscribe((x: any) => {
      this.items = x;
    })
  }

  roleList(user: any){
    return user.rolesInfo.map((x: any) => x.name).join(',');
  }

  addUser() {
    this.router.navigate(['/edit-user']);
  }

  editUser(item: any) {
    this.router.navigate(['/edit-user', item._id ]);
  }

  deleteUser(item: any) {
    this.userService.deleteUser(item, true).subscribe((x: any) => {
      this.toastr.success('Usuario eliminado');
      this.updateList();
    }, (bad_request: any) => {
      this.toastr.error(bad_request.error.error);
    })
  }
}