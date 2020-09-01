import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { Producto } from 'src/app/model/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RubrosService } from 'src/app/services/rubros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { Router, ActivatedRoute } from '@angular/router';

declare const M: any;

@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.component.html',
  styleUrls: ['./subir-producto.component.scss'],
})
export class SubirProductoComponent implements OnInit {
  rubros: any = [];
  producto = new Producto();
  idRubroSeleccionado: string;
  modoEdicion : any;

  productForm = new FormGroup({
    idRubro: new FormControl('',),
    idVendedor: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    stock: new FormControl('',[Validators.required]),
    precio: new FormControl('',[Validators.required]),
    url: new FormControl('',),
  });

  constructor(
    private imgService: ImageUploaderService,
    private rubrosService: RubrosService,
    private service: ProductCardsService,
    private route: ActivatedRoute, 
    private pService: ProductCardsService,
  ) {}

  ngOnInit(): void {
    M.updateTextFields();
    //traigo todos los rubros
    this.rubrosService.getRubros().subscribe((res) => {
      this.rubros = res;
    });

    if(this.route.snapshot.paramMap.get('idProducto') !== null){
    this.modoEdicion = true;
    // me traigo el id de Producto
    this.producto.idProducto = this.route.snapshot.paramMap.get('idProducto')

    this.pService.getProducto(this.producto.idProducto)
      .subscribe((res : Producto) => {
        this.producto = res;
        this.idRubroSeleccionado = this.producto.rubro._id;

        this.productForm.patchValue({
          idRubro : this.producto.rubro._id,
          idVendedor : this.producto.idVendedor,
          nombre : this.producto.nombre,
          descripcion : this.producto.descripcion,
          stock : this.producto.stock,
          precio: this.producto.precio,
          url : this.producto.url
        });
      })
    }
    else{
      this.producto = {
        idProducto : "",
        rubro : this.rubros,
        idVendedor: 0,
        nombre: "",
        descripcion : "",
        stock : 0,
        cantComprar : 0,
        precio : 0,
        url : [ ]
      }
    }
  }

  ImageFile = null;
  url_imagen = null;

  onFileSelected(event) {
    // guardo la imagen seleccionada dentro de la propiedad ImageFile.
    this.ImageFile = event.target.files;

    //esto es para ver la imagen (vista previa) del producto
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
       this.url_imagen = event.target.result;
       this.producto.url.push(this.url_imagen)
      }
      reader.readAsDataURL(event.target.files[0]);    
    }
    console.log(this.producto)
  }

  eliminarImagen(imagen){
    const index = this.producto.url.indexOf(imagen);
    if (index > -1) {
      this.producto.url.splice(index, 1);
    }
  }

  async subirImagenYObtenerURL() {
    return this.imgService.subirImagenes(this.ImageFile);
  }

  save() {
    let rubro = this.rubros.find((r) => r._id === this.idRubroSeleccionado);

    // subo la imagen:
    this.subirImagenYObtenerURL().then((res) => {
      if (res == null) {
        console.log('No se pudo subir imagen');
      } else {
        for (let i = 0; i < res.length; i++) {
          this.producto.url.push(res[i].url);
        }
      }

      let user = JSON.parse(localStorage.getItem('user'));
      let nuevoProducto = {
        nombre: this.productForm.controls.nombre.value,
        rubro: rubro,
        idVendedor: user._id,
        descripcion: this.productForm.controls.descripcion.value,
        stock: this.productForm.controls.stock.value,
        precio: this.productForm.controls.precio.value,
        url: this.producto.url,
      };

      this.service.createProducto(nuevoProducto).subscribe((res) => {
        console.log(nuevoProducto);

        // acá hay que abrir un snack y redireccionar al detalle del producto
      });
    });
  }

  edit(){
    let rubro = this.rubros.find((r) => r._id === this.idRubroSeleccionado);

    // subo la imagen:
    this.subirImagenYObtenerURL().then((res) => {
      if (res == null) {
        console.log('No se pudo subir imagen');
      } else {
        for (let i = 0; i < res.length; i++) {
          this.producto.url.push(res[i].url);
        }
      }

      let user = JSON.parse(localStorage.getItem('user'));
      
      let nuevoProducto = {
        idProducto : this.route.snapshot.paramMap.get('idProducto'),
        nombre: this.productForm.controls.nombre.value,
        rubro: rubro,
        idVendedor: user._id,
        descripcion: this.productForm.controls.descripcion.value,
        stock: this.productForm.controls.stock.value,
        precio: this.productForm.controls.precio.value,
        url: this.producto.url,
      };

      this.service.editProducto(nuevoProducto).subscribe((res) => {
        console.log(nuevoProducto);

        // acá hay que abrir un snack y redireccionar al detalle del producto
      });
    });
  }

  //para cambiar el tamaño del textArea según la altura del scroll
  txtAreaText: string;

  txtAreaTextChanges(input) {
    let txtAreas = document.getElementsByClassName(
      'txt-area'
    ) as HTMLCollectionOf<HTMLElement>;
    //console.log(txtAreas)
    for (var i = 0; i < txtAreas.length; i++) {
      let txtAltura = txtAreas[i].scrollHeight + 2;
      txtAreas[i].style.height = `${txtAltura}px`;
    }
  }
}
