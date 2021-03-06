import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital, HospitalAccidentOrDiseases, HospitalHealthInsurance, HospitalHealthInsurances } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';
import { CommonService } from '../../../common/services/common.service';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';
import { AccidentDiseasesService } from 'src/app/accident-diseases/services/accident-diseases.service';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataHospital: Hospital[];
  hospitalSelected: Hospital = {
    id: '',
    name: '',
    address: '',
    locality: '',
    phone: 0,
    options: '',
    freeBeds: 0,
    // zona: string,
    // info: string,
    // distrito: string,
    atentionLevel: '',
    location: {
      latitude: 0,
      longitude: 0 },
    locationGoogleMap: {
        lat: 0,
        lng: 0
      },
    healthInsurances: [],
    accidentOrDiseases: [],
    beds: [],
    emergencies: []
  };
  inputType: number = InputType.create;
  flagListIsReady = false;
  dataHospitalHealthInsurances: HealthInsurance[];
  dataHospitalAccidentOrDisease: AccidentOrDiseases[];

  constructor(
    private hospitalService: HospitalService,
    private healthInsuranceService: HealthInsuranceService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getHospitals();
  }
  setInputTypeCreate(): void {
    this.accordion.openAll();
    this.inputType = InputType.create;
  }
  getHospitals(): void {
    this.flagListIsReady = true;
    this.hospitalService.getHospitals().subscribe({
      next: res => {
        this.dataHospital = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
        this.flagListIsReady = false;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer cargar los hospitales', 'Cerrar');
      }
    });
  }
  onHospitalSelected(hospital: Hospital): void {
    this.accordion.openAll();
    this.hospitalSelected = hospital;
    this.inputType = InputType.edit;

    this.geHospitalHealthInsurance(hospital.id);
    this.getHospitalAccidentOrDisease(hospital.id);
  }
  onHospitalDeleted(hospital: Hospital): void {
    this.hospitalService.deleteHospitalById(hospital).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataHospital = this.dataHospital.filter( item => item.id !== hospital.id);
        this.commonService.openSnackBar('El hospital se ha eliminado correctamente', 'Perfecto!');
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar el hospital', 'Cerrar');
       }
    });
  }
  onHospitalCreated(hospital: Hospital): void {
    const hospitalToSend = this.mapForm(hospital);
    this.hospitalService.createHospital(hospitalToSend).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.commonService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
       this.getHospitals();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar el hospital', 'Cerrar');
       }
    });
  }
  onHospitalEdited(hospital: Hospital): void {
    const hospitalToSend = this.mapForm(hospital);
    this.hospitalService.updateHospitalById(hospitalToSend).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.commonService.openSnackBar('Se actualizó exitosamente', 'Perfecto!');
       this.getHospitals();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer editar el hospital', 'Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType === 1 ? true : false;
  }
  mapForm(hospital: any): Hospital{
    return {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        locality: hospital.locality,
        phone: hospital.phone,
        freeBeds: hospital.freeBeds,
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
        emergencies: hospital.emergencies,
    };
  }
  /////////////////////////////////////////////////////////////////////////
  ////////////////////// Hospitales Obras sociales ////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /**
   * Se agrega en DB el permiso de atención del hospital para la Obra social
   * @param hospitalHealthInsurance datos para ser insertados
   */
  onHospitalHealthInsuranceCreated(hospitalHealthInsurance: HospitalHealthInsurance): void {
    this.healthInsuranceService.createAffiliatedHealthInsurance(hospitalHealthInsurance).subscribe({
      next: res => {
      this.commonService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar el hospital', 'Cerrar');
      }
    });
  }

  mapToHospitalHealthInsuranceForm(hospitalHealthInsurance: HospitalHealthInsurances): any{
    return {
        idHospital: hospitalHealthInsurance.hospital.id,
        idAccidentOrDisease: hospitalHealthInsurance.healthInsurances.id
    };
  }
  onHospitalHealthInsuranceDeleted(hospitalHealthInsurance: HospitalHealthInsurances): void {
    alert('mensaje no implementado en backend');
    // this.dataHospitalHealthInsurances.spli
  }

  geHospitalHealthInsurance(idHospital: string ): void {
    this.hospitalService.getAllHealthInsurancesById(idHospital).subscribe({
      next: res => {
        this.dataHospitalHealthInsurances = res.healthInsurances;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer obtener las OS del hospital.', 'Cerrar');
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////
  ///////////// Hospitales Enfermedades accidentes atendidos  /////////////
  /////////////////////////////////////////////////////////////////////////

  /** Se obtienen los accidentes y enfermedades que atiende un hospital */
  onHospitalAccidentOrDiseaseCreated(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases): void {
    this.hospitalService.addToAccidentOrDiseaseByIds(this.hospitalSelected, hospitalAccidentOrDiseases.idAccidentOrDisease).subscribe({
      next: res => {
      this.commonService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
      this.getHospitalAccidentOrDisease(hospitalAccidentOrDiseases.idHospital);
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar la atencion en el hospital.'
          + err.error.errors, 'Cerrar');
      }
    });
  }
  /** Se obtienen los accidentes y enfermedades que atiende un hospital */
  getHospitalAccidentOrDisease(idHospital: string): void {
    this.hospitalService.getAllAccidentsOrDiseasesById(idHospital).subscribe({
      next: res => {
        this.dataHospitalAccidentOrDisease = res.accidentOrDiseases;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer obtener las Accidentes-Enfermedades del hospital.', 'Cerrar');
      }
    });
  }
  onHospitalAccidentOrDiseaseDeleted(hospitalAccidentOrDiseases: HospitalAccidentOrDiseases): void {
    alert('no implementado');
  }
}
