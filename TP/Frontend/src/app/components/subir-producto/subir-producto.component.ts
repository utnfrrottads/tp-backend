import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { Producto } from 'src/app/model/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RubrosService } from 'src/app/services/rubros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DialogoComponent } from '../dialogo/dialogo.component';

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
    idRubro: new FormControl('',[Validators.required]),
    idVendedor: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    stock: new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    precio: new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    //url: new FormControl('', [Validators.required]),
  });

  constructor(
    private imgService: ImageUploaderService,
    private rubrosService: RubrosService,
    private service: ProductCardsService,
    private route: ActivatedRoute, 
    private pService: ProductCardsService,
    private router:Router,
    public dialogo: MatDialog
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
      this.idRubroSeleccionado = "Seleccione un rubro para su producto";
    }
  }
  actualizarRubroSeleccionado(){
    this.productForm.patchValue({
      idRubro : this.idRubroSeleccionado
    })
  }

  ImageFile = null;
  url_imagen = null;

  onFileSelected(event) {
    // guardo la imagen seleccionada dentro de la propiedad ImageFile.
    this.ImageFile = event.target.files;
  }

  async subirImagenYObtenerURL() {
    return this.imgService.subirImagenes(this.ImageFile);
  }

  save() {
    let rubro = this.rubros.find((r) => r._id === this.idRubroSeleccionado);

    // subo la imagen:
    this.subirImagenYObtenerURL().then((res) => {
      let URL = [];
      if (res == null) {
        console.log('No se pudo subir imagen');
      } else {
        for (let i = 0; i < res.length; i++) {
          URL.push(res[i].url);
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
        url: URL,
      };

      this.service.createProducto(nuevoProducto).subscribe((res : any) => {
        
        this.dialogo
        .open(DialogoComponent, {
          data: { 
            mensaje: `¡Se ha cargado el producto exitosamente!`,
            tipoDialogEliminar: false,
            tipoDialogAceptar: true
          }
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          //cuando ya leyó el cartel y dió click en aceptar, lo redirijo al producto
          if (confirmado) {
            this.router.navigate(['rubros/productos/',res._id]);
          }
        });
      })
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
        this.router.navigate(['rubros/productos/',nuevoProducto.idProducto]);
      });
    });
  }

  //para cambiar el tamaño del textArea según la altura del scroll
  

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
