import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { Producto } from 'src/app/model/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RubrosService } from 'src/app/services/rubros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { Router } from '@angular/router';

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
    private rubrosService: RubrosService,
    private service:ProductCardsService,
    private router:Router
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

    ImageFile = null;
    url_imagen = null;

    onFileSelected(event) {
      // guardo la imagen seleccionada dentro de la propiedad ImageFile.
      this.ImageFile = event.target.files[0];
    }

  async subirImagenYObtenerURL() {
    // subo la imagen y obtengo su url.
  if (this.ImageFile != null) {
    return this.imgService.subirImagen(this.ImageFile).toPromise();
    } 
    else {
      return Promise.resolve(null);
    }
  }


  save() {
  let rubro = this.rubros.find((r) => r._id === this.idRubroSeleccionado);
    
  // subo la imagen:
  this.subirImagenYObtenerURL()
    .then((res) => {
      let URL;
      if (res == null) {
        console.log("No se pudo subir imagen")              
      } 
      else {
        URL = res.url;
        this.url_imagen = URL;
      }

  let user = JSON.parse(localStorage.getItem('user'));
  let nuevoProducto = {
    nombre: this.productForm.controls.nombre.value,
    rubro: rubro,
    idVendedor: user._id ,
    descripcion: this.productForm.controls.descripcion.value,
    stock: this.productForm.controls.stock.value,
    precio: this.productForm.controls.precio.value,
    url: this.url_imagen
  }

  this.service.createProducto(nuevoProducto)
    .subscribe(
    res => {
      console.log(nuevoProducto)
    
      // acá hay que abrir un snack y redireccionar al detalle del producto
 
    })


    })



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