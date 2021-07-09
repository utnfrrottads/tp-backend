import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userName = '';

  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
    this.userName = this.userService.getUser().nombreUsuario || '';
  }

}
