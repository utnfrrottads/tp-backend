import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/models/field.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FieldService } from 'src/app/services/field.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-do-appointments',
  templateUrl: './admin-do-appointments.component.html',
  styleUrls: ['./admin-do-appointments.component.css']
})
export class AdminDoAppointmentsComponent {

  public field;
  since: Date;
  until: Date;
  now: Date;

  available = [];
  table = false;

  default  = new Date(Date.now()).toISOString().split('T')[0];


  form: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
              private fieldService: FieldService,
              private fb: FormBuilder,
              private appointmentsService: AppointmentService) {
    this.activateRoute.params.subscribe((param: {id: string}) => {
                this.fieldService.getField(param.id)
                          .subscribe((resp: Field) => {
                            this.field = resp;
                          });
    });
    this.createForm();
    this.listenerForm();
  }

  createForm(){
    this.form = this.fb.group({
      sinceDate : [this.default, Validators.required],
      untilDate : [null, Validators.required]
    });
  }

  search(){
    this.appointmentsService.getAvailableAppointments(this.form.value, this.field.id)
                            .subscribe(resp => {
                              this.available = resp;
                              this.table = true;
                            });
  }

  getFieldValid(field: string){
    return this.form.get(field).invalid &&
            this.form.get(field).touched;
 }

   listenerForm(){
     this.form.valueChanges
               .subscribe(data => {
                this.now = new Date(Date.now());
                this.since = this.setDateSince(data.sinceDate);
                if (data.sinceDate !== null){
                  if (this.since.getTime() <= Date.now()){
                    Swal.fire('Fecha menor a hoy', 'Cambiarla', 'error');
                    this.form.patchValue({sinceDate: this.default});
                  }
                }
                if (data.untilDate !== null){
                  this.until = this.setDateUntil(data.untilDate);
                  if (this.until.getTime() <= Date.now()){
                    Swal.fire('Fecha menor a hoy', 'Cambiarla', 'error');
                    this.form.patchValue({untilDate: null});
                  }
                }else{
                    this.form.patchValue({
                        untilDate: data.sinceDate
                    });
                }
                if (this.since !== null && this.until !== null && this.since !== undefined && this.until !== null){
                  if (this.since.getTime() > this.until.getTime()){
                  Swal.fire('Error de fechas', 'Fecha "desde" debe ser menor o igual a fecha "hasta"', 'error');
                  this.form.patchValue({sinceDate: this.default});
                  }
                  if ((this.until.getTime() > this.now.setDate(this.now.getDate() + 8))) {
                    Swal.fire('Error de fechas', 'Solo se puede buscar hasta 7 días posteriores', 'error');
                    this.form.patchValue({untilDate: null});
                  }
                  if ((this.since.getTime() > this.now.setDate(this.now.getDate() + 8))) {
                    Swal.fire('Error de fechas', 'Solo se puede buscar hasta 7 días posteriores', 'error');
                    this.form.patchValue({untilDate: null});
                  }
                }
               });
   }

   setDateSince(dateSince: string): Date{
     const today = new Date();
     if (dateSince !== undefined){
       this.since = new Date(dateSince.replace(/-/g, '\/'));
       this.since.setHours(today.getHours());
       this.since.setMinutes(today.getMinutes());
       this.since.setSeconds(today.getSeconds() + 30);
       return this.since;
     }
    }
    setDateUntil(dateUntil: string): Date{
       this.until = new Date(dateUntil.replace(/-/g, '\/'));
       this.until.setDate(this.until.getDate() + 1);
       return this.until;
    }

}
