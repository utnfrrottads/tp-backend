import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CamaService } from '../services/cama-service.service';
import { Bed } from '../models/bed';
import { MatTableDataSource } from '@angular/material/table';
import { InputType } from '../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html'
})
export class CamaComponent implements OnInit{
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataBed : Bed[];
  bedSelected : Bed = {
    id: '',
    description: '',
    status: '',
    type: '',
    subtype: '',
    idHospital: '',
    hospitalName: ''
  }; 
  inputType: number = InputType.create;

  constructor(
    private camaService: CamaService, 
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.loadCamas();
  }
  setInputTypeCreate(){
    this.accordion.openAll();  
    this.inputType = InputType.create;
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
  onBedSelected(bed: Bed){
    this.accordion.openAll();  
    this.bedSelected = bed;
    this.inputType = InputType.edit;
  }
  onBedDeleted(bed: Bed){
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
  onBedCreated(bed: Bed){
    this.camaService.createBed(bed).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se insertó exitosamente','Perfecto!');
       this.loadCamas();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar la cama','Cerrar');
       } 
    });
  }
  onBedEdited(bed: Bed){ 
    this.camaService.updateBedById(bed).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se actualizó exitosamente','Perfecto!');
       this.loadCamas();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer editar la cama','Cerrar');
       }
    });
  }
} 