import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
@Input() producto: any;

  constructor(private route:ActivatedRoute) { 
    this.producto= {idProducto: 1, idRubro: 1,  idEmpresa: 1, nombre: "Notebook", imagen: "https://http2.mlstatic.com/notebook-lenovo-i3-8130u-4gb-1tb-156-pulgadas-dvdrw-D_NQ_NP_872956-MLA42418883269_062020-F.webp", precio: 50000,  descripcion: "Es una notebook, un producto muy bueno y de alta calidad.", stock: 25 };
  }

  ngOnInit(): void {
    //Acá habría que hacer un getProductos por ID a través de un servicio comparando con el el param de la ruta
  }



}
