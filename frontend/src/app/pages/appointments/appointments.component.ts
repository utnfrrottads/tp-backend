import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent  {

  reservedAppointments = [];
  completedAppointments = [];
  inProgressAppointments = [];
  aboutToStartAppointments = [];

  constructor(private appointmenService: AppointmentService) {
                this.appointmenService.getAppointments()
                                      .subscribe(resp=>{
                                        this.reservedAppointments = resp.reservedAppointments
                                        this.completedAppointments = resp.completedAppointments
                                        this.inProgressAppointments = resp.inProgressAppointments
                                        this.aboutToStartAppointments = resp.aboutToStartAppointments
                                      });

               }
  }
