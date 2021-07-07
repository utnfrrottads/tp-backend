import { Component, OnInit, Inject } from '@angular/core';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[];
  test_input: any;

  constructor(public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getSuppliers()
      .subscribe(
        res => this.suppliers = res,
        err => console.log(err)
      );
  }

  deleteSupplier(id: number){
    if(confirm("Seguro que desea eliminar el proveedor?")){
      this.supplierService.deleteSupplier(id)
        .subscribe(
          res => this.getAll(),
          err => console.log(err)
        );
    }
  }

}
