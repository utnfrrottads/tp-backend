import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000/api/usuarios/';

  login(user, pass) {
    let URL = this.baseURL + 'login';
    let body = {
      usuario: user,
      password: pass,
    };

    return this.http.post(URL, body, {});
  }
}
