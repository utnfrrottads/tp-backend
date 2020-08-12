import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent  {

  appointments = [];
  empty : boolean;
  //hay q agarrar el id del usuario del url (pero antes hya)
  constructor(private appointmenService: AppointmentService) {
                this.appointmenService.getAppointments()
                                      .subscribe(resp=>{
                                        resp.sort
                                        this.appointments = resp
                                      });
                if(this.appointments === []){
                  this.empty = true
                }else{
                  this.empty = false;
                }

               }

}
