import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  readonly baseURL = environment.backendURL + 'verifyToken';

  // Redirect the user to login if not logged in.
  public async canActivate(): Promise<boolean> {
    let token = localStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/login']);
      return false;
    }

    let rta = await this.verifyToken(token).then(
      () => {
        return true;
      },
      () => {
        this.userService.clearLocalStoragedUser();
        this.router.navigate(['/login']);
        return false;
      }
    );
    return rta;
  }

  private verifyToken(token): any {
    const headers = new HttpHeaders().append('Authorization', token);
    return this.http.post(this.baseURL, {}, { headers }).toPromise();
  }
}
