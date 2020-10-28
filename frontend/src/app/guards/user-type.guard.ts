import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
        constructor(private userService: UserService,
                    private router : Router){
            }
        canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
        return this.userService.getUserType()
        .pipe(tap( (resp : any) =>{
        if (resp.description !== 'USER'){
          this.router.navigateByUrl('/admin/home')
        }
        }))
        }

        }

