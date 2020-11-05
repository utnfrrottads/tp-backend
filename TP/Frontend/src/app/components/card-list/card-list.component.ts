import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
@Input() producto: any;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  routToProduct(idProducto){
    this.router.navigate(['/rubros/productos/', idProducto]);
  }

}
