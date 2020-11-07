import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Field } from '../models/field.model';
import { FieldForm } from '../interfaces/fieldForm.inteface';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private http: HttpClient) { }

  getField(id: string){
    const token = localStorage.getItem('token') || '';
    return this.http.get(`http://localhost:3000/api/fields/${id}`,
                                                    {headers: {'x-token': token}})
                    .pipe(map((data: any) => {
                      return data.field;
                    }));
  }
  getFields(search: any){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'x-token': token
    });
    const params = new HttpParams().set('search', search);
    return this.http.get(`http://localhost:3000/api/fields`, { params , headers})
                    .pipe(map((data: any) => {
                      return data.fields;
                    }));
  }
  getFieldsByCenterAdmin(search: any, id){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'x-token': token
    });
    const params = new HttpParams().set('search', search);
    return this.http.get(`http://localhost:3000/api/fields/admin/${id}`, { params , headers})
                    .pipe(map((data: any) => {
                      return data.fields;
                    }));
  }
  createField(form: FieldForm, uid){
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    const body = {
      name: form.name,
      cantMaxPlayers: form.cantMaxPlayers,
      price: form.price,
      openingHour: form.openingHour,
      closingHour: form.closingHour,
      description: form.description,
      user: uid
    };
    return this.http.post(`http://localhost:3000/api/fields`, body, {headers});
  }

  deleteField(id: string){
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`http://localhost:3000/api/fields/${id}`, {headers: {'x-token': token}} );
  }

  updateField(id, form: FieldForm){
    const body = {
      name: form.name,
      cantMaxPlayers: form.cantMaxPlayers,
      price: form.price,
      openingHour: form.openingHour,
      closingHour: form.closingHour,
      description: form.description
    };
    const token = localStorage.getItem('token') || '';
    return this.http.put(`http://localhost:3000/api/fields/${id}`, body, {headers: {'x-token': token}} );
  }
}
