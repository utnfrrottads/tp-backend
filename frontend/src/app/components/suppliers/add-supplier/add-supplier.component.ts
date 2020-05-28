import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  supplier: Supplier;

  constructor(
    private supplierService: SupplierService, 
    private router: Router
  ) {
      this.supplier = new Supplier();
    }


  addSupplier(){
    this.supplierService.addSupplier(this.supplier)
    .subscribe(
      res => this.router.navigate(['/suppliers']),
      err => console.log(err)
    );
  }

  cancel(){
    if(confirm('Desea cancelar?')){
      this.router.navigate(['/suppliers']);
    }
  }

}
