import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionistasService {

  constructor(private http: HttpClient) { }

  readonly baseURL = environment.backendURL + 'comisionistas';

  getComisionistas(){
    const URL = this.baseURL;
    return this.http.get(URL);
  }
}
