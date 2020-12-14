import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  // Redirect the user to login if not logged in.
  public canActivate(): boolean {
    let token = localStorage.getItem('token');
    

    if (true) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
