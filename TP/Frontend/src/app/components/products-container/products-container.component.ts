import { Component, OnInit } from '@angular/core';
import { ProductCardsService } from '../../services/product-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent implements OnInit {
  list: any = [];
  pageEvent: PageEvent;
  currentItemsToShow = [];

  // se usa para que espere a mostrar que no hay items.
  enabledToShowNoItems = false;

  constructor(
    private service: ProductCardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      res => {
        this.list = res.products;
        this.onPageChange({ pageIndex: 0, pageSize: 9 });
        return;
      }
    );
    
  }

  onPageChange($event): void {
    this.enabledToShowNoItems = true;
    this.currentItemsToShow = this.list.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  hayProductos(): any {
    const res = (this.enabledToShowNoItems && this.list <= 0) ?  false : true;
    return res;
  }
}
