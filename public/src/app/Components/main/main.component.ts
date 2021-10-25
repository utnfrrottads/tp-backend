import { Component } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public currentUser: User

  constructor(
    private userService : UserService
  ) {
    this.currentUser = userService.getCurrentUser();
  }
}
