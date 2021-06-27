import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private activedRoute: ActivatedRoute) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate([""]);
      return false;
    } else {
      return true;
    }
  }

}
