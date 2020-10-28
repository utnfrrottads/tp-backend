import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Field } from '../models/field.model';
import { fieldForm } from '../interfaces/fieldForm.inteface';

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
  getFieldsByCenterAdmin(search: any,id){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'x-token': token
    })
     const params = new HttpParams().set("search",search)
    return this.http.get(`http://localhost:3000/api/fields/admin/${id}`,{params:params ,headers:headers})
                    .pipe(map((data:any) =>{
                      return data.fields
                    }));
  }
  createField(fieldForm : fieldForm, uid){
    const headers= new HttpHeaders({
      'x-token': localStorage.getItem('token')
    })
    const body = {
      name: fieldForm.name,
      cantMaxPlayers: fieldForm.cantMaxPlayers,
      price: fieldForm.price,
      openingHour: fieldForm.openingHour,
      closingHour: fieldForm.closingHour,
      description: fieldForm.description,
      user: uid
    }
    return this.http.post(`http://localhost:3000/api/fields`,body,{headers:headers})
  }

  deleteField(id: string){
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`http://localhost:3000/api/fields/${id}`,{headers:{'x-token': token}} )
  }

  updateField(id, fieldForm){
    const body = {
      name: fieldForm.name,
      cantMaxPlayers: fieldForm.cantMaxPlayers,
      price: fieldForm.price,
      openingHour: fieldForm.openingHour,
      closingHour: fieldForm.closingHour,
      description: fieldForm.description
    }
    const token = localStorage.getItem('token') || '';
    return this.http.put(`http://localhost:3000/api/fields/${id}`,body,{headers:{'x-token': token}} )
  }
}