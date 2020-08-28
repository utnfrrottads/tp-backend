import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { Producto } from 'src/app/model/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RubrosService } from 'src/app/services/rubros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageUploaderService } from '../../services/image-uploader.service';

declare const M: any;

@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.component.html',
  styleUrls: ['./subir-producto.component.scss']
})
export class SubirProductoComponent implements OnInit {
  rubros:any=[];
  producto = new Producto();
  idRubroSeleccionado:any;

  constructor(
    private imgService: ImageUploaderService,
    private rubrosService: RubrosService
    ) {}

  ngOnInit(): void {
    M.updateTextFields();
    //traigo todos los rubros
    this.rubrosService.getRubros()
    .subscribe((res)=>{
      this.rubros = res;
    })
  }
  
  productForm = new FormGroup({
    idRubro: new FormControl(''),
    idEmpresa: new FormControl(''),
    nombre: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    stock: new FormControl(''),
    precio: new FormControl(''),
    url: new FormControl('')
  });


  obtenerIdRubro(idRubro){
    //cargo el valor del idRubro
    this.idRubroSeleccionado= idRubro;
  }



    save() {
      console.log(this.productForm)
    }

  

    ImageFile = null;

    onFileSelected(event) {
      // guardo la imagen seleccionada dentro de la propiedad ImageFile.
      this.ImageFile = event.target.files[0];
    }

    async subirImagenYObtenerURL() {
      // subo la imagen y obtengo su url.
      if (this.ImageFile != null) {
        return this.imgService.subirImagen(this.ImageFile).toPromise();
      } else {
        return Promise.resolve(null);
      }
    }

    //para cambiar el tamaño del textArea según la altura del scroll
    txtAreaText: string;

    txtAreaTextChanges(input){
    let txtAreas = document.getElementsByClassName("txt-area") as HTMLCollectionOf<HTMLElement>; ;
    //console.log(txtAreas)
      for(var i=0; i < txtAreas.length; i++) { 
        let txtAltura = txtAreas[i].scrollHeight +2;
        txtAreas[i].style.height = `${txtAltura}px`;
      }
    }
}