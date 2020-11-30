import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardsService } from 'src/app/services/product-cards.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from '../../model/productos';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProducto: string;
  producto = new Producto();
  vendedor: any = {};
  usuario: any = {};
  vendedorIsNotComprador: any;
  imagenVendedor =
    'https://res.cloudinary.com/elcurco8/image/upload/v1598910919/TTADS-TP/user_ybrhuc.png';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductCardsService,
    private userService: UserService,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuario = this.userService.getLocalUser();

    this.idProducto = this.route.snapshot.paramMap.get('idProducto');

    this.productService.getProducto(this.idProducto).subscribe((res: Producto) => {
      this.producto = res;
      this.userService.getUser(this.producto.idVendedor).subscribe((res) => {
        this.vendedor = res;
        this.imagenVendedor = this.vendedor.url;
      });
    });

  }



}
