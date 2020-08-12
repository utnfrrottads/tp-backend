import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private http: HttpClient) { }
  
  getFields(){
    const token = localStorage.getItem('token') || '';
    return this.http.get('http://localhost:3000/api/fields/',
                                                    {headers:{'x-token':token}})
                    .pipe(map((data:any) =>{
                      return data.fields
                    }));
  }
  getField(id:string){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`http://localhost:3000/api/fields/${id}`,
                                                    {headers:{'x-token':token}})
                    .pipe(map((data:any) =>{
                      return data.field
                    }));
  }
  getFieldsByParams(param: any){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`http://localhost:3000/api/fields/search/${param}`,
                                                    {headers:{'x-token':token}})
                    .pipe(map((data:any) =>{
                      return data.fields
                    }));
  }
}