import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styles: [
  ]
})
export class AdminHomeComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
  }
}
