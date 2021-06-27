import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  localStorage: Storage = localStorage;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
