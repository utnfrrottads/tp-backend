import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.css']
})
export class AdminAppointmentsComponent implements OnInit {

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

  ngOnInit(): void {
  }
}
