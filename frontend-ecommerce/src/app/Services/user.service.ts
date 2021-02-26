import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[]
  readonly API_URL = "http://localhost:3000/api/user/"

  constructor( private http:HttpClient) { 
    this.selectedUser = new User();
    this.users = [];
  }

  loginUser(username: string, password: string){
    
    var login = `{"username": "${username}", "password":"${password}"}`;

    var url = this.API_URL + "login";

    return this.http.post(url, JSON.parse(login));
  }

  logoutUser() {
    localStorage.removeItem('CurrentUser')
  }

  getUsers(){
    return this.http.get(this.API_URL)
  }

  getUser(user: User){
    return this.http.get(this.API_URL+`${user._id}`)
  }

  postUser(user: User){
    this.http.post(this.API_URL, user)
  }

  putUser(user: User){
    this.http.put(this.API_URL+`${user._id}`, user)
  }

  deleteUser(user: User, reasign: Boolean){
    this.http.delete(this.API_URL+`?id=${user._id}&reasign=${reasign}`)
  }
}
