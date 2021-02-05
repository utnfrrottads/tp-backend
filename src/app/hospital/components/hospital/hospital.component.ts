import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital, HospitalAccidentOrDiseases, HospitalHealthInsurance, HospitalHealthInsurances } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';
import { CommonService } from '../../../common/services/common.service';
import { HospitalHealthInsuranceFormComponent } from '../hospital-health-insurance-form/hospital-health-insurance-form.component';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';

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
    options: '',
    // zona: string,
    // info: string,
    // distrito: string,
    atentionLevel: '',
    location:{
      latitude:0,
      longitude:0 },
    locationGoogleMap:{
        lat:0,
        lng:0 },
    healthInsurances: [],
    accidentOrDiseases: [],
    beds: []
  }; 
  inputType: number = InputType.create;
  flagListIsReady: boolean = false;

  constructor(
    private hospitalService: HospitalService,
    private healthInsuranceService: HealthInsuranceService, 
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
        this.dataHospital = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
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
    const hospitalToSend = this.mapForm(hospital);
    this.hospitalService.createHospital(hospitalToSend).subscribe({
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
    const hospitalToSend = this.mapForm(hospital); 
    this.hospitalService.updateHospitalById(hospitalToSend).subscribe({
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
  mapForm(hospital: any): Hospital{
    return {  
        id: hospital.id,
        name: hospital.name, 
        address: hospital.address, 
        locality: hospital.locality, 
        phone: hospital.phone,
       // location: hospital.location,
        
        location: {
          latitude: hospital.latitude,
          longitude: hospital.longitude
        },
        locationGoogleMap: hospital.locationGoogleMap,  // este no se usa
        options: hospital.options, 
        atentionLevel: hospital.atentionLevel, 
        healthInsurances: hospital.healthInsurances, 
        accidentOrDiseases: hospital.accidentOrDiseases, 
        beds: hospital.beds, 
    }
  }
  /////////////////////////////////////////////////////////////////////////
  ////////////////////// Hospitales Obras sociales ////////////////////////
  /////////////////////////////////////////////////////////////////////////
  onHospitalHealthInsuranceCreated(hospitalHealthInsurance: HospitalHealthInsurance){ 
    // console.log('hospitalHealthInsurance', hospitalHealthInsurance);
    // const hospitalHealthInsuranceToSend = this.mapToHospitalHealthInsuranceForm(hospitalHealthInsurance);
    //console.log('hospitalHealthInsuranceToSend', hospitalHealthInsuranceToSend);
    this.healthInsuranceService.createAffiliatedHealthInsurance(hospitalHealthInsurance).subscribe({
      next: res => { 
      this.commonService.openSnackBar('Se insertó exitosamente','Perfecto!'); 
      },
      error: err => {
        console.log('err', err);
        this.commonService.openSnackBar('Ups... algo falló al querer agregar el hospital','Cerrar');
      } 
    });
  }
  
  mapToHospitalHealthInsuranceForm(hospitalHealthInsurance: HospitalHealthInsurances): any{
    return {  
        idHospital: hospitalHealthInsurance.hospital.id,
        idAccidentOrDisease: hospitalHealthInsurance.healthInsurances.id
    }
  }

  onHospitalHealthInsuranceDeleted(hospitalHealthInsurance: HospitalHealthInsurances){
    alert('mensaje no implementado, esperando backend');
  }
  /////////////////////////////////////////////////////////////////////////
  ///////////// Hospitales Enfermedades accidentes atendidos  /////////////
  /////////////////////////////////////////////////////////////////////////
  onHospitalAccidentOrDiseaseCreated(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases){
    alert('mensaje no implementado, esperando backend');
  }
  onHospitalAccidentOrDiseaseDeleted(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases){
    alert('mensaje no implementado, esperando backend');
  }
}
