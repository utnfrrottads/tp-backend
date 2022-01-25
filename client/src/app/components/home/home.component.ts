import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  goToServicios() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/servicios/']);
    } else {
      //Navigate to Sign In
    }
  }

  publicarServicio() {
    if (this.authService.loggedIn()) {
      //Show publish service pop-up
      this.router.navigate(['/servicios/']);
    } else {
      //Navigate to Sign In
    }
  }
}
