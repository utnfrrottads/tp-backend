import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog'; 
@Component({
  selector: 'app-dialog-compra-venta',
  templateUrl: './dialog-compra-venta.component.html',
  styleUrls: ['./dialog-compra-venta.component.scss']
})
export class DialogCompraVentaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
