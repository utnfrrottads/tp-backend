import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListProductComponent implements OnInit {

  items: any = [];
  isMultiple = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.productService.getAllProducts().subscribe(x => {
      this.items = x;
    });
  }

  branchList(product: any){
    return product.branchInfo.map((x:any) => x.street)
  }

  articleList(product: any){
    return product.articleInfo.map((x:any) => x.name)
  }

  addProduct() {
    this.router.navigate(['/edit-product']);
  }

  updateProduct(item: any) {
    this.router.navigate(['/edit-product', item._id ]);
  }

  deleteProduct(item: any) {
    this.productService.deleteProduct(item._id).subscribe(x => {
      this.toastr.success('Producto eliminado');
      this.updateList();
    }, bad_request => {
      this.toastr.error(bad_request.error.error);
    })
  }
}
