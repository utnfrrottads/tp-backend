import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: User;

  constructor(private userService: UserService,
              private router: Router){
              }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.userService.validateToken()
      .pipe(tap( isauthenticated => {
          if (!isauthenticated){
            this.router.navigateByUrl('/login');
          }
          this.user = this.userService.user;
          if (this.user.role.description !== 'USER'){
                this.router.navigateByUrl('/admin/home');
            }
      }));
  }
}
