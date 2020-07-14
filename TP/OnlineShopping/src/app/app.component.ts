import { Component, OnInit } from '@angular/core';
import { Producto } from '../app/model/productos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OnlineShopping';
 

  ngOnInit() {}

  getLista() {}
}
