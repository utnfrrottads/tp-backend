import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
@Input() producto: any;

  constructor() {
  }


  ngOnInit(): void {
  }

  routToProduct(idProducto){
    //this.router.navigate(['/product-detail/'+idProducto]);
  }

}
