import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';

import { environment } from 'src/environments/environment';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CloudinaryService } from '../../../services/cloudinary.service';

import { Usuario } from '../../../models/Usuario';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('deleteAccountModal', { static: false }) deleteAccountModal?: ModalDirective;

  errorMessageClave = '';
  editando: boolean = false;
  bsModalRef?: BsModalRef;

  usuario: Usuario = {
    nombreUsuario: '',
    clave: '',
    nombreApellido: '',
    email: '',
    habilidades: '',
    fotoPerfil: '',
    imagen: null,
  };

  usuarioEditado: Usuario = {
    nombreUsuario: '',
    nombreApellido: '',
    email: '',
    habilidades: '',
  };

  errorFormatoImagen: boolean = false;
  cloudinary_url = environment.CLOUDINARY_URL;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.usuario = this.userService.getUsuario();
    this.usuarioEditado = this.userService.getUsuario();
  }

  abrirModalClave(event: any) {
    event.preventDefault();
    $('#ingresarClavePopup').modal('show');
  }

  guardarUsuario(event: any) {
    event.preventDefault();
    this.userService.updateUsuario(this.usuarioEditado, this.usuario.clave || '').subscribe(
      (res: any) => {
        this.errorMessageClave = '';

        localStorage.setItem('usuario', JSON.stringify(res.data.updateUsuario.usuario));
        localStorage.setItem('nombreUsuario', res.data.updateUsuario.usuario.nombreUsuario);
        localStorage.setItem('token', res.data.updateUsuario.token);

        this.usuario.nombreUsuario = res.data.updateUsuario.usuario.nombreUsuario;
        this.usuario.clave = '';
        this.usuario.nombreApellido = res.data.updateUsuario.usuario.nombreApellido;
        this.usuario.email = res.data.updateUsuario.usuario.email;
        this.usuario.habilidades = res.data.updateUsuario.usuario.habilidades;

        this.usuarioEditado.nombreUsuario = res.data.updateUsuario.usuario.nombreUsuario;
        this.usuarioEditado.nombreApellido = res.data.updateUsuario.usuario.nombreApellido;
        this.usuarioEditado.email = res.data.updateUsuario.usuario.email;
        this.usuarioEditado.habilidades = res.data.updateUsuario.usuario.habilidades;

        this.editando = false;

        $("#ingresarClavePopup").modal("hide");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
      },
      (err: any) => {
        this.errorMessageClave = err.message;
      }
    )
  }

  abrirModalImagen() {
    $('#fotoPerfilPopup').modal('show');
  }

  obtenerImagen(event: any) {
    if (
      event.target.files[0].name.split(".").pop() === "jpg"
      || event.target.files[0].name.split(".").pop() === "jpeg"
      || event.target.files[0].name.split(".").pop() === "png"
    ) {
      this.errorFormatoImagen = false;
      this.usuario.imagen = event.target.files[0];
    } else {
      this.errorFormatoImagen = true;
    }
  }

  guardarImagen(event: any): void {
    event.preventDefault();
    if (this.usuario.imagen && !this.errorFormatoImagen) {
      const formImagen = new FormData();
      formImagen.append("file", this.usuario.imagen);
      formImagen.append("upload_preset", environment.UPLOAD_PRESET);

      this.cloudinaryService.uploadImage(formImagen).subscribe(
        (res: any) => {
          this.usuario.fotoPerfil = res.public_id + '.' + res.format;
          this.userService.updateProfileImage(this.usuario).subscribe(
            (res: any) => {
              localStorage.setItem('usuario', JSON.stringify(res.data.updateProfileImage));
            },
            (err: any) => {
              console.log(err.message);
            }
          );

          $('#fotoPerfilPopup').modal('hide');
        },
        (err: any) => {
          console.log(err.message);
        }
      );
    }
  }

  eliminarImagen(): void {
    this.usuario.fotoPerfil = '';
    this.userService.deleteProfileImage().subscribe(
      (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.data.deleteProfileImage));
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  openDeleteAccountModal(): void {
    this.deleteAccountModal?.show();
  }

  closeDeleteAccountModal(): void {
    this.deleteAccountModal?.hide();
  }

  confirmDeleteAccount(): void {
    this.userService.deleteAccount(this.usuario).subscribe(
      (res: any) => {
        this.deleteAccountModal?.hide();
        this.authService.logout();
      },
      (err: any) => {
        console.log(err);
        alert(err);
      }
    );
  }
}
