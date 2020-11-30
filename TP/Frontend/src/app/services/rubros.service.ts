import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  constructor(private http: HttpClient) { }

  readonly baseURL = environment.backendURL + 'rubros/';

  getRubros(): Observable<any> {
    const URL = this.baseURL;
    return this.http.get(URL);
  }

}
