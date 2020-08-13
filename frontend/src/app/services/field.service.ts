import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private http: HttpClient) { }
  
  getField(id:string){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`http://localhost:3000/api/fields/${id}`,
                                                    {headers:{'x-token':token}})
                    .pipe(map((data:any) =>{
                      return data.field
                    }));
  }
  getFields(search: any){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'x-token': token
    })
     const params = new HttpParams().set("search",search)


    return this.http.get(`http://localhost:3000/api/fields`,{params:params ,headers:headers})
                    .pipe(map((data:any) =>{
                      return data.fields
                    }));
  }
}