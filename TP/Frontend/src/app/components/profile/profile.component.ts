import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { FormGroup, FormControl } from '@angular/forms';
declare const M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private imgService: ImageUploaderService
  ) {}

  mainForm = new FormGroup({
    usuario: new FormControl({ value: '', disabled: true }),
    pass: new FormControl(''),
    pass_repeat: new FormControl(''),
    tipo: new FormControl(''),
    cuil: new FormControl(''),
    nombre: new FormControl(''),
    localidad: new FormControl(''),
    telefono: new FormControl(''),
    mail: new FormControl(''),
  });

  url_imagen = null;
  ImageFile = null;

  ngOnInit(): void {}

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

  subirImagen(input) {
    // subo la imagen y obtengo su url.
    if (this.ImageFile != null) {
      this.imgService.subirImagen(this.ImageFile).subscribe((rta) => {
        this.url_imagen = rta.url;
      });
    }
  }

  onFileSelected(event) {
    // guardo la imagen seleccionada.
    this.ImageFile = event.target.files[0];
  }
}
