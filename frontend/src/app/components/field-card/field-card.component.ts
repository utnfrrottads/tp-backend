import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field-card',
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.css']
})
export class FieldCardComponent {

  @Input() field: any = {};
  @Input() id: any;
  user: User;

  constructor(private router: Router,
              private userService: UserService,
              private fieldService: FieldService) {
                this.user = this.userService.user;
               }

  navigateField(id){
    if (this.user.role.description === 'USER'){
      this.router.navigateByUrl(`/appointment/${id}`);
    }
    else if (this.user.role.description === 'CENTER-ADMIN'){
      this.router.navigateByUrl(`/admin/appointment/${id}`);
    }

  }
  updateField(id: string){
    this.router.navigateByUrl(`/admin/field/${id}`);
  }
  deleteField(id: string){
    Swal.fire({
      title: '¿Estás seguro de eliminar la cancha?',
      text: `Cancha: ${this.field.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#FAE804',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.fieldService.deleteField(id)
                            .subscribe(resp => {
                              Swal.fire({
                                title: 'Cancha eliminada',
                                icon: 'error',
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 2000
                              });
                              setTimeout(() => {
                                location.reload();
                              }, 2000);
                              }, (err) => {
                                console.log(err);
                                Swal.fire('Error al Eliminar la cancha', 'No se puede eliminar una cancha con turnos programados', 'error');
                              });

    }
    });
  }

}
