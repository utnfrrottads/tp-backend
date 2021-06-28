import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

import { Usuario } from "../../models/Usuario";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = {
    nombreApellido: '',
    email: '',
    habilidades: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.profile().subscribe(
      (res: any) => {
        this.usuario = res;
      },
      (err: any) => console.log(err)
    );
  }

}
