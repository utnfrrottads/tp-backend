import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
@Input() producto: any;

  constructor() { 
    this.producto= {idProducto: 1, idRubro: 1,  
      empresa: {razonSocial: "este es el nombre de la empresa", localidad: "Chabas", direccion:"San Martin 1717", imagen: "https://fotografias.lasexta.com/clipping/cmsimages02/2019/11/14/66C024AF-E20B-49A5-8BC3-A21DD22B96E6/58.jpg"}, 
      nombre: "Notebook", imagen: "https://http2.mlstatic.com/notebook-lenovo-i3-8130u-4gb-1tb-156-pulgadas-dvdrw-D_NQ_NP_872956-MLA42418883269_062020-F.webp", precio: 50000,  descripcion: "Es una notebook, un producto muy bueno y de alta calidad.", stock: 25 };
  }

  ngOnInit(): void {
  }



}
