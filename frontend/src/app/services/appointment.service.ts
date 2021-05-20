import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatesForm } from '../interfaces/datesForm.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(){
        const token = localStorage.getItem('token') || '';
        return this.http.get('http://localhost:3000/api/appointments/user', {headers: {'x-token': token}})
                        .pipe(map((data: any) => {
                            return data.appointments;
                          }));
    }
    getAvailableAppointments(form: DatesForm, id: string){
      const token = localStorage.getItem('token') || '';
      let params = new HttpParams();
      params = params.append('dateSince', form.sinceDate);
      params = params.append('dateUntil', form.untilDate);
      return this.http.get(`http://localhost:3000/api/appointments/available/${id}`, { params , headers: {'x-token': token}})
                        .pipe(map((data: any) => {
                            return data.available;
                          }));
    }

    createAppointments(appointment){
      const token = localStorage.getItem('token') || '';
      return this.http.post('http://localhost:3000/api/appointments', appointment, {headers: {'x-token': token}} );
    }

    deleteAppointment(id: string){
      const token = localStorage.getItem('token') || '';
      return this.http.delete(`http://localhost:3000/api/appointments/${id}`, {headers: {'x-token': token}} );
    }
}
