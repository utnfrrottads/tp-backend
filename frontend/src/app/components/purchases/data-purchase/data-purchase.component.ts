import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Supplier } from 'src/app/models/supplier/Supplier';

@Component({
  selector: 'app-data-purchase',
  templateUrl: './data-purchase.component.html',
  styleUrls: ['./data-purchase.component.css']
})
export class DataPurchaseComponent implements OnInit {

  supplier: Supplier;

  constructor(
    private dialogRef: MatDialogRef<DataPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.supplier = data
    }

  ngOnInit(): void {
    console.log(this.supplier);
  }

  close(){
    this.dialogRef.close();
  }

}
