import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() producto: any;
  images: string[];

  eSlider: any;
  slider: any;
  eBox: any;
  box: any;

  constructor(private route: ActivatedRoute) {
    this.producto = {
      idProducto: 1,
      idRubro: 1,
      empresa: {
        razonSocial: 'nombre de la empresa',
        localidad: 'Chabas',
        direccion: 'San Martin 1717',
        imagen:
          'https://fotografias.lasexta.com/clipping/cmsimages02/2019/11/14/66C024AF-E20B-49A5-8BC3-A21DD22B96E6/58.jpg',
      },
      nombre: 'Notebook',
      imagen: [
        'https://http2.mlstatic.com/notebook-intel-dual-core-4gb-500gb-hp-14-pulgadas-hdmi-wifi-D_NQ_NP_935496-MLA31032116361_062019-Q.jpg',
        'https://http2.mlstatic.com/notebook-lenovo-v15-core-i7-10ma-gen-1tb-ssd-240gb-12gb-D_NQ_NP_718399-MLA41642098919_052020-F.webp',
      ],
      precio: 50000,
      descripcion: 'Es una notebook, un producto muy bueno y de alta calidad.',
      stock: 25,
    };

    this.images = this.producto.imagen;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    //slider
    this.eSlider = document.querySelectorAll('.slider');
    this.slider = M.Slider.init(this.eSlider, {
      interval: 9999999
    });

    //materialboxed
    this.eBox = document.querySelectorAll('.materialboxed');
    this.box = M.Materialbox.init(this.eBox);
  }
}
