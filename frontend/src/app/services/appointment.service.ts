import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

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
}