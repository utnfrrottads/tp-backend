import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-do-appointment-table',
  templateUrl: './do-appointment-table.component.html',
  styleUrls: ['./do-appointment-table.component.css']
})
export class DoAppointmentTableComponent implements OnInit {

  @Input() available;
  @Input() field;
  @Input() searching;
  appointment: any = {};

  constructor(private appointmentsService: AppointmentService,
              private userService: UserService,
              private router: Router) {
              }

  ngOnInit(): void {
  }

  async reserveAppointment(appointmentDate: Date){
    Swal.fire({
      title: '¿Estás seguro?',
      text: ``,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#009846',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reservar'
    }).then((result) => {
      if (result.value) {
        if (this.userService.user.role.description === 'USER'){
          this.createUserAppointment(appointmentDate);
        }
        if (this.userService.user.role.description === 'CENTER-ADMIN'){
          this.createCenterAdminAppointment(appointmentDate);
        }
    }
    });
  }

  createUserAppointment(appointmentDate){
    this.appointment = {
      date: appointmentDate,
      user: this.userService.user.uid,
      field: this.field.id,
      owner: {
        name: this.userService.user.name,
        oid: this.userService.user.uid,
        phone: this.userService.user.phone
      }
    };
    this.sendAppointment();
  }
  async createCenterAdminAppointment(appointmentDate){
    let name;
    let oid;
    let phone;
    const { value: formValues } = await Swal.fire({
      title: 'Datos de la reserva',
      html:
        '<input id="swal-name" placeholder="Nombre" class="swal2-input">' +
        '<input id="swal-oid" type:"number" placeholder="DNI" class="swal2-input">' +
        '<input id="swal-phone" type:"number" placeholder="Teléfono" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
         name = ( document.getElementById('swal-name') as HTMLInputElement).value,
         oid =  ( document.getElementById('swal-oid') as HTMLInputElement).value,
         phone =  ( document.getElementById('swal-phone') as HTMLInputElement).value
        ];
      }
    });
    this.appointment = {
      date: appointmentDate,
      user: this.userService.user.uid,
      field: this.field.id,
      owner: {
        name,
        oid,
        phone
      }
    };
    await this.sendAppointment();
  }

  sendAppointment(){
    this.appointmentsService.createAppointments(this.appointment)
                    .subscribe(resp => {
                              Swal.fire({
                                title: 'Turno Reservado',
                                text: `¡Que te diviertas!`,
                                icon: 'success',
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 2000
                            });
                              setTimeout(() => {
                                this.goAppointments();
                              }, 2000);
                    }, (err) => {
                      console.log(err);
                      Swal.fire('Error al reservar', 'Ingrese correctamente los datos solicitados', 'error');
                    });
  }
  goAppointments(){
    if (this.userService.user.role.description === 'USER'){
      this.router.navigate(['/appointments']);
    }
    if (this.userService.user.role.description === 'CENTER-ADMIN'){
      this.router.navigate(['/admin/appointments']);
    }
  }
}
