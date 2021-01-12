 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common/services/common.service';
import { Bed } from '../../models/bed'
import { CamaService } from '../../services/cama-service.service';
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html'
})
export class CamaListComponent implements OnInit { 

  dataBed: Bed[];   
  @Output() bedSelected = new EventEmitter();
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];

  constructor(
    private camaService: CamaService, 
    private commonService: CommonService
    ) { }

  ngOnInit() {
    this.loadCamas();
  }
  editCama(bed: Bed){
    this.bedSelected.emit(bed);
  }
  deleteCama(bed: Bed){
    this.camaService.deleteBedById(bed).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataBed = this.dataBed.filter( item => !(item.id===bed.id && item.idHospital===bed.idHospital));
        this.commonService.openSnackBar('La cama se ha eliminado correctamente','Perfecto!');
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar la cama','Cerrar');
       } 
    });
  }
  loadCamas(){
    this.camaService.getCamas().subscribe({
      next: res =>{
        console.log('se recargo');
        this.dataBed = res.camas;
      },
      error: err =>{
        this.commonService.openSnackBar('Ups... algo falló al querer cargar las camas','Cerrar');
      }
    });
  }  
}
