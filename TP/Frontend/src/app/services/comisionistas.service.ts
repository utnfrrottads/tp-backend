import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComisionistasService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:3000/api/comisionistas/';
  
  getComisionistas(){
    const URL = this.baseURL; 
    return this.http.get(URL);
  }
}
