import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../Models/user';
import { Observable } from 'rxjs';


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

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getUser(user: User){
    return this.http.get(this.API_URL+`${user._id}`)
  }

  getById(id: any): Observable<any>{
    return this.http.get<any[]>(this.API_URL + id);
  }

  postUser(user: User){
    return this.http.post(this.API_URL, user)
  }

  putUser(user: User){
    return this.http.put(this.API_URL+`${user._id}`, user)
  }

  deleteUser(user: User, reasign: Boolean){
    return this.http.delete(this.API_URL+`/${user._id}/${reasign}`)
  }
}
