import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  readonly URL_API = "http://localhost:3000/api/user/"

  constructor( private http:HttpClient) { 
    this.selectedUser = new User();
  }

  loginUser(username: string, password: string){
    
    var login = `{"username": "${username}", "password":"${password}"}`;

    var url = this.URL_API + "login";

    return this.http.post(url, JSON.parse(login));
  }

  logoutUser() {
    localStorage.removeItem('CurrentUser')
  }
}
