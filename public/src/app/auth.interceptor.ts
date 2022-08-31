import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

      const currentUser = localStorage.getItem("CurrentUser");
      
      if (currentUser) {
          return next.handle(req);
      }
      else {
          this.router.navigate(['/']);
          return next.handle(req);
      }
      
  }
}