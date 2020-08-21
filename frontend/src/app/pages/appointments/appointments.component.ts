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
  empty : boolean = true
  constructor(private appointmenService: AppointmentService) {
                this.appointmenService.getAppointments()
                                      .subscribe(resp=>{
                                        this.appointments = resp
                                        if(this.appointments.length ===0){
                                          this.empty = true
                                        }else{
                                          this.empty = false;
                                        }
                                      });

               }

}
