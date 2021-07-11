import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.scss']
})
export class CambiarClaveComponent implements OnInit {

  errorMessage = '';
  claveActual = '';
  claveNueva = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  cambiarClave(): void {
    this.userService.cambiarClave(this.claveActual, this.claveNueva).subscribe(
      (res: any) => {
        this.errorMessage = '';
        this.claveActual = '';
        this.claveNueva = '';

        localStorage.setItem('usuario', JSON.stringify(res.data.cambiarClave.usuario));
        localStorage.setItem('nombreUsuario', res.data.cambiarClave.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.cambiarClave.token);

        $("#btnCloseCambiarClavePopup").click();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Clave actualizada correctamente",
          showConfirmButton: true,
          timer: 4000
        })
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    )
  }

}
