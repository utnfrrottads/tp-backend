import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap, map, catchError} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user : User
  constructor(private http : HttpClient,
              private router:Router,) { }
  
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

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get('http://localhost:3000/api/login/renew', {
                          headers: {
                            'x-token':token
                          }
                        })
              .pipe(tap((resp:any)=>{
                        const{name,uid,email,role,phone,address} = resp.user;
                        this.user  = new User( name,address,phone,email,'',role,uid)
                        localStorage.setItem('token',resp.token)
            }),map(resp=>{
                        return true
            }),catchError(error =>{
                        return of(false)
          })
      )
  }

  getUser(id:string){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`http://localhost:3000/api/users/${id}`,{
                            headers:{'x-token':token 
                          }
                        })
                        // .pipe(map((data: any)=>{
                        //   return data.user
                        // }))
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
  

}