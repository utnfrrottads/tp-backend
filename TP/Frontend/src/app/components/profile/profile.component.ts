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
    private imgService: ImageUploaderService,
    private router: Router
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
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['login'])
    }

    M.AutoInit();
    M.updateTextFields();
    this.storagedUser = JSON.parse(localStorage.getItem('user'));
    this.patchStoragedUser();
    console.log(this.storagedUser);
  }

  openSnackBar(message: string, action: string) {
    //metodo para que aparezca en pantalla un snack para informar al usuario.
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async subirImagenYObtenerURL() {
    // subo la imagen y obtengo su url.
    if (this.ImageFile != null) {
      return this.imgService.subirImagen(this.ImageFile).toPromise();
    } else {
      return Promise.resolve(null);
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
    if (
      this.mainForm.controls.pass.value !==
      this.mainForm.controls.pass_repeat.value
    ) {
      this.openSnackBar('Las contraseñas no coinciden', '¡Entendido!');
    } else {
      // si habia imagen, la subo:
      this.subirImagenYObtenerURL().then((res) => {
        let URL;
        if (res == null) {
          URL = this.storagedUser.url;
        } else {
          URL = res.url;
          this.url_imagen = URL;
        }
        // edito al usuario.
        this.userService
          .editUser(
            this.mainForm.controls,
            this.tipoUsuario,
            URL,
            this.storagedUser._id
          )
          .subscribe((res) => {
            // actualizo la imagen
            this.url_imagen = URL;
            // guardo localmente al usuario actualizado
            this.userService.updateStoragedUser(this.mainForm.controls, URL, this.tipoUsuario, this.storagedUser._id);
            // actualizo la promiedad storagedUser para que se renderizen bien el html
            this.storagedUser = JSON.parse(localStorage.getItem('user'));
            this.openSnackBar('¡Su usuario ha sido actualizado!', 'OK')
          });

        this.ImageFile = null;
      });
    }
  }
}
