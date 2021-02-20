import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital/services/hospital.service'
import { Hospital } from '../../hospital/models/hospital';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../common/services/common.service';
import { AccidentOrDiseases } from '../../accident-diseases/models/accidentOrDiseases';
import { EmergencyService } from '../services/emergency.service'
import { AccidentDiseasesService } from '../../accident-diseases/services/accident-diseases.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit {
  /** Angular reactive form with Emergencies   */
  emergencyForm: FormGroup; 
  accidentOrDiseasesForm: FormGroup; 
  /** Test backend */
  hospitals : Hospital[];
  /** Hospital data set (optionally will have filters) */
  hospitalData: Hospital[];
  /**Hospital selected in the map (closest)) */
  hospitalSelected: Hospital;
  /** Accident-Diseases data set */
  dataAccidentOrDiseases: AccidentOrDiseases[]; 
  /** It allows to indicate if the data set was obtained*/
  flagGetPersonHealth: boolean = false;
  
  constructor(
    private hospitalService: HospitalService,
    private accidentDiseasesService: AccidentDiseasesService,
    private commonService: CommonService,
    private emergencyService: EmergencyService
  ) { }

  ngOnInit(): void{
    this.initForm();
    this.getHospitals();
    // this.getAtentionLevel();
    this.getAllAccidentsOrDiseases();
  }
  
  /**
   * Se inicializan los formularios de emergencia y de accident-diseases
   */
  initForm(){
    this.emergencyForm = new FormGroup({
      id: new FormControl(''),
      dateOfEntrance: new FormControl('2021-02-20', [Validators.required]),
      dateOfExit: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      locality: new FormControl('Rosario', [Validators.required]),
      ambulanceLicensePlate: new FormControl('AB789FG', [Validators.required]),
      accidentOrDisease: new FormControl(''),
      idAccidentOrDisease: new FormControl(''),
      idHospital: new FormControl(''),
      idPatient: new FormControl(''),
      idNurse: new FormControl(''),
      idBed: new FormControl('ydQdNmXYVit8x1Eu757O'), // TODO
    });
    this.accidentOrDiseasesForm = new FormGroup({ 
      accidentOrDiseases: new FormControl(''),  
    });
  }
  

  onCreateEmergency(){
    this.emergencyService.createEmergency(
        this.emergencyForm.value
      , this.emergencyForm.controls.idHospital.value
      , this.emergencyForm.controls.idBed.value 
      , this.emergencyForm.controls.idAccidentOrDisease.value 
      ).subscribe({
        next: res => {
          this.commonService.openSnackBar(res.msg, 'Cerrar');
        },
        error: err => {
          this.commonService.openSnackBar('Ups... algo falló al querer tomar la cama. ' + err.msg, 'Cerrar');
        }
      }
    ) 
  }




/**
 * GETS all accidentOrDiseases of the collection.
 */
  getAllAccidentsOrDiseases(){
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        this.dataAccidentOrDiseases = res.accidentOrDiseases;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer traer los accidentes/enfermedades','Cerrar');
      } 
    });  
  }
/**
 * GETS all hospitals by accidentOrDisease of the collection.
 */
  getAllHospitalsByAccidentOrDiseasesId(){
    this.accidentDiseasesService.getAllHospitalsByAccidentOrDiseasesId(
      this.accidentOrDiseasesForm.controls.accidentOrDiseases.value
    ).subscribe({
      next: res => {
        this.hospitalData = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
        this.onAccidentOrDiseasesSelected();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer traer los accidentes/enfermedades','Cerrar');
      } 
    });  
  }
  
/**
 * GETS the closest hospitals by lat long.
 */  
  getClosestHospitals(){ 
    this.hospitalService.getClosestHospitals(
      this.emergencyForm.controls.atentionLevel.value
      ).subscribe({
      next: res => {
        this.hospitals = res.hospitals;
      }
    })
  }
/**
 * Set idPatient in form.
 * Event output generated in search form from emergency-person
 * @param personHealthInsurance person and health insurance selected
 */
  onPersonHealthInsuranceSelected(personHealthInsurance: any){
    this.emergencyForm.patchValue({
      idPatient: personHealthInsurance.person.id
    })
  }
  /**
   * Set idHospital in form.
   * Event output generated in map. 
   * @param personHealthInsurance person and health insurance selected
   */
  onHospitalSelected(hospital: any){
    this.hospitalSelected = hospital;
    this.emergencyForm.patchValue({
      idHospital: hospital.id
    });
  }
  /** Set idAccidentOrDisease in form */
  onAccidentOrDiseasesSelected(){
    this.emergencyForm.patchValue({
      idAccidentOrDisease: this.accidentOrDiseasesForm.controls.accidentOrDiseases.value
    }) 

  }
  /** Set idAccidentOrDisease in form */
  onPositionUpdated(position: any){
    this.emergencyForm.patchValue({
      location: { 
        latitude: position.lat,
        longitude: position.lng
      }
    }) 

  }



  
  getHospitals(): void{  
    this.hospitalService.getHospitals().subscribe({
        next: res => { 
          this.hospitalData = this.hospitalService.getFormatOkFrontendHospital(res.hospitals); 
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer obtener los Hospitales','Cerrar');
      } 
    });
  }

  
  // dataAtentionLevel: AtentionLevel[];

  // getAtentionLevel(){
  //   this.hospitalService.getAtentionLevel().subscribe({
  //     next: res => {
  //     this.dataAtentionLevel = res;
  //     },
  //     error: err => {
  //       this.commonService.openSnackBar('Ups... algo falló al querer obtener los Niveles de Atención','Cerrar');
  //      } 
  //   });  
  // }
}
