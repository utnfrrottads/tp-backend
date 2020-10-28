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
  
  signIn(dataForm: LoginForm, type:string ){
    const body = {
      email : dataForm.email,
      password: dataForm.password,
      type: type
    }
    return this.http.post('http://localhost:3000/api/login/',body)
                    .pipe(tap((resp:any)=>{
                        localStorage.setItem('token',resp.token)
                    }))
  }

  signUp(dataForm : User, role){
    dataForm.role = role;
    return this.http.post('http://localhost:3000/api/users/',dataForm)
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


  logOut(){
    localStorage.removeItem('token');
  }
  
  updateUser(id : string, data : RegisterForm){
    const token = localStorage.getItem('token')|| '';
    return this.http.put(`http://localhost:3000/api/users/${id}`,data,{ headers: {'x-token':token}})
  }

  getUserType(){
    const token = localStorage.getItem('token')|| '';
    console.log('entra al servicio')
    return this.http.get(`http://localhost:3000/api/users/type/${this.user.role}`,{ headers: {'x-token':token}})
  }
}