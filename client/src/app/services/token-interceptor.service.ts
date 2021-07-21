import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpInterceptor } from "@angular/common/http";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: any, next: any) {
    if (this.authService.getToken()) {
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
      return next.handle(tokenizeReq);
    }
    return next.handle(req.clone());
  }

}
