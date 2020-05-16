import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[];

  constructor(public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getSuppliers()
      .subscribe(res => {
        this.suppliers = res;
      });
  }

  deleteSupplier(id: number){
    if(confirm("Seguro que desea eliminar?")){
      this.supplierService.deleteSupplier(id)
        .subscribe(
          res => this.getAll(),
          err => console.log(err)
        );
    }else {
      return;
    }
  }

}
