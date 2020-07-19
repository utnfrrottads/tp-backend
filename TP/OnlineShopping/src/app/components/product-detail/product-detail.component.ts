import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var M:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
@Input() producto: any;
images:string[];

  constructor(private route:ActivatedRoute) { 
    this.producto= {idProducto: 1, idRubro: 1,  
      empresa: {razonSocial: "nombre de la empresa", localidad: "Chabas", direccion:"San Martin 1717", imagen: "https://fotografias.lasexta.com/clipping/cmsimages02/2019/11/14/66C024AF-E20B-49A5-8BC3-A21DD22B96E6/58.jpg"}, 
      nombre: "Notebook", imagen : ["https://http2.mlstatic.com/notebook-lenovo-i3-8130u-4gb-1tb-156-pulgadas-dvdrw-D_NQ_NP_872956-MLA42418883269_062020-F.webp",
    "https://http2.mlstatic.com/notebook-lenovo-v15-core-i7-10ma-gen-1tb-ssd-240gb-12gb-D_NQ_NP_718399-MLA41642098919_052020-F.webp"], precio: 50000,  descripcion: "Es una notebook, un producto muy bueno y de alta calidad.", stock: 25 };
          console.log(this.producto.imagen);

    this.images = (this.producto.imagen);
    }

  ngOnInit(): void {
    //Acá habría que hacer un getProductos por ID a través de un servicio comparando con el el param de la ruta

    document.addEventListener('DOMContentLoaded', function() {
      //slider
      var elems = document.querySelectorAll('.slider');
      var instance = M.Slider.init(elems,{
        interval:999999
      }
        );

      setInterval(()=>{

          instance.stop();
        
      },2000)

      //materialboxed
      var elems = document.querySelectorAll('.materialboxed');
      var instance = M.Materialbox.init(elems);
      
    });


  }



}
