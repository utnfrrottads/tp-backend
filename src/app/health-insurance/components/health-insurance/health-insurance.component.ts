import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HealthInsurance } from '../../models/health-insurance';
import { HealthInsuranceService  } from '../../services/health-insurance.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.css']
})
export class HealthInsuranceComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataHealthInsurance: HealthInsurance[];
  healthInsuranceSelected: HealthInsurance = {
    id: '',
    legalName: '',
    fantasyName: '',
    phone: 0,
  };
  inputType: number = InputType.create;
  flagListIsReady = false;

  constructor(
    private healthInsuranceService: HealthInsuranceService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getHealthInsurances();
  }

  setInputTypeCreate(): void {
    this.accordion.openAll();
    this.inputType = InputType.create;
  }
  getHealthInsurances(): void {
    this.flagListIsReady = true;
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res => {
        this.dataHealthInsurance = res.healthInsurances;
        this.flagListIsReady = false;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer cargar las Obras sociales', 'Cerrar');
      }
    });
  }
  onHealthInsuranceSelected(healthInsurance: HealthInsurance): void {
    this.accordion.openAll();
    this.healthInsuranceSelected = healthInsurance;
    this.inputType = InputType.edit;
  }
  onHealthInsuranceDeleted(healthInsurance: HealthInsurance): void {
    this.healthInsuranceService.deleteHealthInsuranceById(healthInsurance).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataHealthInsurance = this.dataHealthInsurance.filter( item => !(item.id === healthInsurance.id));
        this.dialogService.openSnackBar('La obra social se ha eliminado correctamente', 'Perfecto!');
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer eliminar la obra social', 'Cerrar');
       }
    });
  }
  onHealthInsuranceCreated(healthInsurance: HealthInsurance): void {
    this.healthInsuranceService.createHealthInsurance(healthInsurance).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
       this.getHealthInsurances();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer agregar la obra social', 'Cerrar');
       }
    });
  }
  onHealthInsuranceEdited(healthInsurance: HealthInsurance): void {
    this.healthInsuranceService.updateHealthInsuranceById(healthInsurance).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se actualizó exitosamente', 'Perfecto!');
       this.getHealthInsurances();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer editar la obra social', 'Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType === 1 ? true : false;
  }
}
