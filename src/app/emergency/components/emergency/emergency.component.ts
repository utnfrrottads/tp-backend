import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../hospital/services/hospital.service';
import { Hospital } from '../../../hospital/models/hospital';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../../common/services/dialog.service';
import { AccidentOrDiseases } from '../../../accident-diseases/models/accidentOrDiseases';
import { EmergencyService } from '../../services/emergency.service';
import { AccidentDiseasesService } from '../../../accident-diseases/services/accident-diseases.service';
import { Bed } from 'src/app/bed/models/bed';

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
  hospitals: Hospital[];
  /** Hospital data set (optionally will have filters) */
  hospitalData: Hospital[];
  /** Hospital selected in the map (closest)) */
  hospitalSelected: Hospital;
  /** Accident-Diseases data set */
  dataAccidentOrDiseases: AccidentOrDiseases[];
  /** Beds data set */
  dataBeds: Bed[];
  /** It allows to indicate if the data set was obtained */
  flagGetPersonHealth = false;

  isOptional = true;

  constructor(
    private hospitalService: HospitalService,
    private accidentDiseasesService: AccidentDiseasesService,
    private dialogService: DialogService,
    private emergencyService: EmergencyService,
    private formBuilder: FormBuilder
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
  initForm(): void {
    this.emergencyForm = new FormGroup({
      id: new FormControl(''),
      dateOfEntrance: new FormControl(''),
      dateOfExit: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      locality: new FormControl('Rosario', [Validators.required]),
      ambulanceLicensePlate: new FormControl('AB789FG', [Validators.required]),
      accidentOrDisease: new FormControl(''),
      idAccidentOrDisease: new FormControl(''),
      idHospital: new FormControl(''),
      idPatient: new FormControl(''),
      idNurse: new FormControl(''),
      idBed: new FormControl(''), // TODO
    });
    // this.accidentOrDiseasesForm = new FormGroup({
    //   accidentOrDiseases: new FormControl(''),
    // });

    this.accidentOrDiseasesForm = this.formBuilder.group({
      accidentOrDiseases: ['', Validators.required]
    });
  }

  onCreateEmergency(): void {
    this.emergencyService.createEmergency(
        this.emergencyForm.value
      , this.emergencyForm.controls.idHospital.value
      , this.emergencyForm.controls.idBed.value
      , this.emergencyForm.controls.idAccidentOrDisease.value
      ).subscribe({
        next: res => {
          this.dialogService.openSnackBar(res.msg, 'Cerrar');
        },
        error: err => {
          this.dialogService.openSnackBar('Ups... algo falló al querer tomar la cama. ' + err.msg, 'Cerrar');
        }
      }
    );
  }




/**
 * GETS all accidentOrDiseases of the collection.
 */
  getAllAccidentsOrDiseases(): void {
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        this.dataAccidentOrDiseases = res.accidentOrDiseases;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer traer los accidentes/enfermedades', 'Cerrar');
      }
    });
  }
/**
 * GETS all hospitals by accidentOrDisease of the collection.
 */
  getAllHospitalsByAccidentOrDiseasesId(): void {
    this.accidentDiseasesService.getAllHospitalsByAccidentOrDiseasesId(
      this.accidentOrDiseasesForm.controls.accidentOrDiseases.value
    ).subscribe({
      next: res => {
        this.hospitalData = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
        this.onAccidentOrDiseasesSelected();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer traer los accidentes/enfermedades', 'Cerrar');
      }
    });
  }

/**
 * GETS the closest hospitals by lat long.
 */
  getClosestHospitals(): void {
    this.hospitalService.getClosestHospitals(
      this.emergencyForm.controls.atentionLevel.value
      ).subscribe({
      next: res => {
        this.hospitals = res.hospitals;
      }
    });
  }
/**
 * Set idPatient in form.
 * Event output generated in search form from emergency-person
 * @param personHealthInsurance person and health insurance selected
 */
  onPersonHealthInsuranceSelected(personHealthInsurance: any): void {
    this.emergencyForm.patchValue({
      idPatient: personHealthInsurance.person.id
    });
  }
  /**
   * Set idHospital in form.
   * Event output generated in map.
   * @param personHealthInsurance person and health insurance selected
   */
  onHospitalSelected(hospital: any): void {
    this.hospitalSelected = hospital;
    this.emergencyForm.patchValue({
      idHospital: hospital.id
    });
    this.getAllBedsById(hospital.id);
  }
  /** Set idAccidentOrDisease in form */
  onAccidentOrDiseasesSelected(): void {
    this.emergencyForm.patchValue({
      idAccidentOrDisease: this.accidentOrDiseasesForm.controls.accidentOrDiseases.value
    });

  }
  /** Set idAccidentOrDisease in form */
  onPositionUpdated(position: any): void {
    this.emergencyForm.patchValue({
      location: {
        latitude: position.lat,
        longitude: position.lng
      }
    });
  }
  /**
   * Set idHospital in form.
   * Event output generated in map.
   * @param personHealthInsurance person and health insurance selected
   */
  onBedSelected(bed: any): void {
    this.emergencyForm.patchValue({
      idBed: bed.id
    });
  }
  getAllBedsById(idHospital: string): void{
    this.hospitalService.getAllBedsById(idHospital).subscribe({
      next: res => {
        const beds = res.beds.filter( b => b.status === 'Libre' );
        this.dataBeds = beds;
    },
    error: err => {
      this.dialogService.openSnackBar(err.error.msg, 'Cerrar');
     }
    });
  }

  getHospitals(): void{
    this.hospitalService.getHospitals().subscribe({
        next: res => {
          this.hospitalData = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer obtener los Hospitales', 'Cerrar');
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
  //       this.dialogService.openSnackBar('Ups... algo falló al querer obtener los Niveles de Atención', 'Cerrar');
  //      }
  //   });
  // }
}
