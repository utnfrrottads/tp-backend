import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/loginForm.interface';
import { tap } from "rxjs/operators";
import { RegisterForm } from '../interfaces/registerForm.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signIn(dataForm: LoginForm ){
    return this.http.post('http://localhost:3000/api/login/',dataForm)
                    .pipe(tap((resp:any)=>{
                        localStorage.setItem('token',resp.token)
                    }))
  }

  signUp(dataForm : RegisterForm){
    return this.http.post('http://localhost:3000/api/users/',dataForm)
                    .pipe(tap((resp:any)=>{
                      localStorage.setItem('token',resp.token)
                     }))
  }

}
