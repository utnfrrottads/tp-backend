import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataHospital : Hospital[];
  hospitalSelected : Hospital = {
    id: '',
    name: '',
    address: '',
    locality: '',
    phone: 0, 
    zipcode: '', 
    colorMarker: '',
    colorTextoMarker: '',
    options: '',
    // zona: string,
    // info: string,
    // distrito: string,
    atentionLevel: '',
    location:{
      latitude:0,
      longitude:0 },
    healthInsurances: [],
    accidentOrDiseases: [],
    beds: []
  }; 
  inputType: number = InputType.create;
  flagListIsReady: boolean = false;

  constructor(
    private hospitalService: HospitalService, 
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getHospitals();
  }
  setInputTypeCreate(){
    this.accordion.openAll();  
    this.inputType = InputType.create;
  } 
  getHospitals(){
    this.flagListIsReady = true;
    this.hospitalService.getHospitals().subscribe({
      next: res =>{
        this.dataHospital = res.hospitals;
        this.flagListIsReady = false;
      },
      error: err =>{
        this.commonService.openSnackBar('Ups... algo falló al querer cargar los hospitales','Cerrar');
      }
    });
  }  
  onHospitalSelected(hospital: Hospital){
    this.accordion.openAll();  
    this.hospitalSelected = hospital;
    this.inputType = InputType.edit;
  }
  onHospitalDeleted(hospital: Hospital){
    this.hospitalService.deleteHospitalById(hospital).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataHospital = this.dataHospital.filter( item => item.id!=hospital.id);
        this.commonService.openSnackBar('El hospital se ha eliminado correctamente','Perfecto!');
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar el hospital','Cerrar');
       } 
    });
  }
  onHospitalCreated(hospital: Hospital){
    this.hospitalService.createHospital(hospital).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se insertó exitosamente','Perfecto!');
       this.getHospitals();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar el hospital','Cerrar');
       } 
    });
  }
  onHospitalEdited(hospital: Hospital){ 
    this.hospitalService.updateHospitalById(hospital).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se actualizó exitosamente','Perfecto!');
       this.getHospitals();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer editar el hospital','Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType===1 ? true : false;
  }
}
