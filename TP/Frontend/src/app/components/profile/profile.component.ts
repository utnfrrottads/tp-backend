import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Observable, observable } from 'rxjs';
declare var M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private imgService: ImageUploaderService
  ) {}

  storagedUser: any = {};

  mainForm = new FormGroup({
    usuario: new FormControl({ value: '', disabled: true }),
    pass: new FormControl('', [Validators.minLength(6), Validators.required]),
    pass_repeat: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
    tipo: new FormControl(''),
    cuil: new FormControl(''),
    nombre: new FormControl('', [Validators.minLength(2)]),
    localidad: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    mail: new FormControl('', Validators.email),
  });
  tipoUsuario = 'particular';

  url_imagen = null;
  ImageFile = null;

  ngOnInit(): void {
    M.AutoInit();
    M.updateTextFields();
    this.storagedUser = JSON.parse(localStorage.getItem('user'));
    this.patchStoragedUser();
    console.log(this.storagedUser);
  }

  save(form) {}
  discard(form) {}

  obtenerImagenUsuario() {
    if (this.url_imagen === null) {
      // imagen por defecto.
      return 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
    }
    return this.url_imagen;
  }

  openSnackBar(message: string, action: string) {
    //metodo para que aparezca en pantalla un snack para informar al usuario.
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async subirImagen() {
    // subo la imagen y obtengo su url.
    if (this.ImageFile != null) {
      this.imgService.subirImagen(this.ImageFile).subscribe((res) => {
        return res.url
      });
    } else {
      return null
    }
  }

  onFileSelected(event) {
    // guardo la imagen seleccionada dentro de la propiedad ImageFile.
    this.ImageFile = event.target.files[0];
  }

  patchStoragedUser() {
    this.mainForm.patchValue({
      usuario: this.storagedUser.usuario,
      tipo: this.storagedUser.tipo,
      cuil: this.storagedUser.cuil,
      nombre: this.storagedUser.nombre,
      localidad: this.storagedUser.localidad,
      direccion: this.storagedUser.direccion,
      telefono: this.storagedUser.telefono,
      mail: this.storagedUser.mail,
    });
    this.tipoUsuario = this.storagedUser.tipo;
  }

  async editUser() {
    // antes de editar reviso que las pass coincidan.
    if (this.mainForm.controls.pass.value !== this.mainForm.controls.pass_repeat.value) {
      this.openSnackBar('Las contraseñas no coinciden', '¡Entendido!');
    } else {
      // si habia imagen, la subo:
      let urlImagenSubida = await this.subirImagen();
      
      console.log(urlImagenSubida)
      // me mostro otra cosa. No esperó a que me suba la imagen.
      

      /*
      this.userService
        .editUser(
          this.mainForm.controls,
          this.tipoUsuario,
          null,
          this.storagedUser._id
        )
        .subscribe((res) => console.log(res));
        */
    }
  }
}
