import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PurchaseService } from './../../../services/purchase/purchase.service';

@Component({
  selector: 'app-data-purchase',
  templateUrl: './data-purchase.component.html',
  styleUrls: ['./data-purchase.component.css']
})
export class DataPurchaseComponent implements OnInit {

  supplier: any;
  purchases: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<DataPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public purchaseService: PurchaseService
  ){ 
    this.supplier = data 
  }

    
  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(){
     this.purchaseService.getSupplierPurchases(this.supplier.supplier.id_proveedor)
      .subscribe(
        res => this.purchases = res,
        err => console.log(err)
      ) 
  }

  deletePurchase(purchase: any){
     if(confirm('Seguro que desea eliminar la compra?')){
       this.purchaseService.deletePurchase(purchase.id_articulo, purchase.id_proveedor, purchase.fecha_compra)
       .subscribe(
          res => this.close(),
          err => console.log(err)
        ) 
     }
  }

   close(){
    this.dialogRef.close();
  } 

}
