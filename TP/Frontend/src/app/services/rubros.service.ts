import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:3000/api/rubros/';

  getRubros(){
    const URL = this.baseURL; 
    return this.http.get(URL);
  }
  
}
