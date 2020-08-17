import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { datesForm } from '../interfaces/datesForm.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  
    getAppointments(){
        const token = localStorage.getItem('token') || '';
//FALTA ORDENAR LAS FECHAS PARA MOSTRAR LAS MAS RECIENTES 
        return this.http.get('http://localhost:3000/api/appointments/user',{headers:{'x-token':token}})
                        .pipe(map((data:any) =>{
                            return data.appointments
                          }));
    }
    getAvailableAppointments(form : datesForm, id:string){
      const token = localStorage.getItem('token') || '';
      console.log(form.sinceDate)
      let params = new HttpParams()
      params = params.append('dateSince',form.sinceDate)
      params = params.append('dateUntil',form.untilDate)
      '/available/:field'
      return this.http.get(`http://localhost:3000/api/appointments/available/${id}`,{params: params ,headers:{'x-token':token}})
                        .pipe(map((data:any) =>{
                            return data.available
                          }));
    }
}