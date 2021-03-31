import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BedService } from '../../services/bed.service';
import { Bed } from '../../models/bed';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';
import { DialogService } from '../../../common/services/dialog.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit{
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataBed: Bed[];
  bedSelected: Bed = {
    id: '',
    description: '',
    status: '',
    type: '',
    subtype: '',
    idHospital: '',
    hospitalName: ''
  };
  inputType: number = InputType.create;
  flagListIsReady = false;

  constructor(
    private bedService: BedService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadBeds();
  }
  setInputTypeCreate(): void {
    this.accordion.openAll();
    this.inputType = InputType.create;
  }
  loadBeds(): void {
    this.flagListIsReady = true;
    this.bedService.getBeds().subscribe({
      next: res => {
        this.dataBed = res.beds;
        this.flagListIsReady = false;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer cargar las camas', 'Cerrar');
      }
    });
  }
  onBedSelected(bed: Bed): void {
    this.accordion.openAll();
    this.bedSelected = bed;
    this.inputType = InputType.edit;
  }
  onBedDeleted(bed: Bed): void {
    this.bedService.deleteBedById(bed).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataBed = this.dataBed.filter( item => !(item.id === bed.id && item.idHospital === bed.idHospital));
        this.dialogService.openSnackBar('La cama se ha eliminado correctamente', 'Perfecto!');
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer eliminar la cama', 'Cerrar');
       }
    });
  }
  onBedCreated(bed: Bed): void {
    this.bedService.createBed(bed).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
       this.loadBeds();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer agregar la cama', 'Cerrar');
       }
    });
  }
  onBedEdited(bed: Bed): void {
    this.bedService.updateBedById(bed).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se actualizó exitosamente', 'Perfecto!');
       this.loadBeds();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer editar la cama', 'Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType === 1 ? true : false;
  }
}
