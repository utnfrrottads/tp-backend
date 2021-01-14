import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HealthInsurance } from '../../models/health-insurance';
import { HealthInsuranceService  } from '../../services/health-insurance.service';
import { CommonService } from 'src/app/common/services/common.service';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.css']
})
export class HealthInsuranceComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataHealthInsurance : HealthInsurance[];
  healthInsuranceSelected : HealthInsurance = {
    id: '',
    legalName: '',
    fantasyName: '',
    phone: 0,
  }; 
  inputType: number = InputType.create;
  flagListIsReady: boolean = false;

  constructor(
    private healthInsuranceService: HealthInsuranceService, 
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.loadHealthInsurances();
  }

  setInputTypeCreate(){
    this.accordion.openAll();  
    this.inputType = InputType.create;
  } 
  loadHealthInsurances(){
    this.flagListIsReady = true;
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res =>{
        console.log('res', res);
        this.dataHealthInsurance = res.healthInsurances;
        this.flagListIsReady = false;
      },
      error: err =>{
        console.log('err',err);
        this.commonService.openSnackBar('Ups... algo falló al querer cargar las Obras sociales','Cerrar');
      }
    });
  }  
  onHealthInsuranceSelected(healthInsurance: HealthInsurance){
    this.accordion.openAll();  
    this.healthInsuranceSelected = healthInsurance;
    this.inputType = InputType.edit;
  }
  onHealthInsuranceDeleted(healthInsurance: HealthInsurance){
    this.healthInsuranceService.deleteHealthInsuranceById(healthInsurance).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataHealthInsurance = this.dataHealthInsurance.filter( item => !(item.id===healthInsurance.id));
        this.commonService.openSnackBar('La obra social se ha eliminado correctamente','Perfecto!');
      },
      error: err => {
        console.log('err',err);
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar la obra social','Cerrar');
       } 
    });
  }
  onHealthInsuranceCreated(healthInsurance: HealthInsurance){
    this.healthInsuranceService.createHealthInsurance(healthInsurance).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se insertó exitosamente','Perfecto!');
       this.loadHealthInsurances();
      },
      error: err => {
        console.log('err',err);
        this.commonService.openSnackBar('Ups... algo falló al querer agregar la obra social','Cerrar');
       } 
    });
  }
  onHealthInsuranceEdited(healthInsurance: HealthInsurance){ 
    this.healthInsuranceService.updateHealthInsuranceById(healthInsurance).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se actualizó exitosamente','Perfecto!');
       this.loadHealthInsurances();
      },
      error: err => {
        console.log('err',err);
        this.commonService.openSnackBar('Ups... algo falló al querer editar la obra social','Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType===1 ? true : false;
  }
}
