import { Component } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public currentUser: User

  constructor() {
    var string = localStorage.getItem('CurrentUser') || JSON.stringify(new User());
    this.currentUser = JSON.parse(string)
  }
}
