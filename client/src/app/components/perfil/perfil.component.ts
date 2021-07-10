import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  editando: boolean = false;

  usuario: Usuario = {
    nombreUsuario: '',
    nombreApellido: '',
    email: '',
    habilidades: '',
  };

  usuarioEditado: Usuario = {
    nombreUsuario: '',
    nombreApellido: '',
    email: '',
    habilidades: '',
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.usuario = this.userService.getUsuario();
    this.usuarioEditado = this.userService.getUsuario();
  }

  guardarUsuario() {
    this.userService.update(this.usuarioEditado).subscribe(
      (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.data.updateUsuario.usuario));
        localStorage.setItem('nombreUsuario', res.data.updateUsuario.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.updateUsuario.token);

        this.usuario = res.data.updateUsuario.usuario;
        this.usuarioEditado = res.data.updateUsuario.usuario;

        this.editando = false;
      },
      (err: any) => console.log(err)
    );
  }

}
