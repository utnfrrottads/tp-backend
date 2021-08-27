import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/services/user.service';

import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {

  usuario: Usuario = {
    nombreUsuario: '',
    clave: '',
    nombreApellido: '',
    email: '',
    habilidades: '',
    fotoPerfil: '',
    imagen: null,
  };

  cloudinary_url = environment.CLOUDINARY_URL;

  usuarioQuery: any;
  usuarioSubscription: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.suscribeUsuario();
  }

  ngOnDestroy(): void {
    if (this.usuarioSubscription) this.unsuscribeUsuario();
  }

  suscribeUsuario(): void {
    this.usuarioQuery = this.userService.usuario(this.rutaActiva.snapshot.params.usuario);
    this.usuarioSubscription = this.usuarioQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.usuario;
      })
    ).subscribe(
      (res: any) => {
        this.usuario = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshUsuario(): void {
    this.usuarioQuery.refetch();
  }

  unsuscribeUsuario(): void {
    this.usuarioSubscription.unsubscribe();
  }

}
