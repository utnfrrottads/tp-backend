import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {
  @Input() text: string;
  @Input() appointments: Appointment[];
  user: User;

  constructor(private userService: UserService,
              private appointmentService: AppointmentService,
              private router: Router) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }
  deleteAppointment(id: string){
    Swal.fire({
      title: '¿Cancelar el turno?',
      text: ``,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#009846',
      cancelButtonColor: '#D1D1D1',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.value) {
        this.appointmentService.deleteAppointment(id)
                              .subscribe(resp => {
                                Swal.fire({
                                  title: 'Turno cancelado',
                                  icon: 'error',
                                  timer: 2000,
                                  showConfirmButton: false,
                                  allowOutsideClick: false
                                });
                                setTimeout(() => {
                                  location.reload();
                                }, 2000);
                              });
      }
    });
  }
}
