import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Supplier } from 'src/app/models/supplier/Supplier';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {

  selectedSupplier: Supplier;

  constructor(
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.selectedSupplier = new Supplier();
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.getById(params);
  }

  getById(params){
    this.supplierService.getById(params.id)
      .subscribe(
        res => this.selectedSupplier = res,
        err => console.log(err)
      );
  }
  

  editSupplier(){
    delete this.selectedSupplier.id_proveedor;
    this.supplierService.editSupplier(this.activatedRoute.snapshot.params.id, this.selectedSupplier)
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
  
  validate(){
    if(this.selectedSupplier.cuit.toString() === '' || this.selectedSupplier.razon_social === ''){
      alert('Complete el cuit y la razón social')
    }
    else{
      this.editSupplier();
    }
  }
}
