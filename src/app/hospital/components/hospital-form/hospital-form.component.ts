import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { HealthInsuranceService } from '../../../health-insurance/services/health-insurance.service';
import { BedService } from '../../../cama/services/bed.service';
import { AtentionLevel, Hospital, HospitalResult } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';  
import { HealthInsurance } from '../../../health-insurance/models/health-insurance';
import { Bed } from '../../../cama/models/bed';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.css']
})
export class HospitalFormComponent implements OnInit {


  @Input() inputType: InputType;
  @Input() hospitalSelected: Hospital;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  hospitalForm: FormGroup; 
  dataHospital: Hospital[];
  dataAtentionLevel: AtentionLevel[];
  dataHealthInsurance: HealthInsurance[];
  dataAccidentOrDiseases: AccidentOrDiseases[];
  dataBed: Bed[];

  constructor( 
    private hospitalService: HospitalService,
    private healthInsuranceService : HealthInsuranceService,
    private bedService: BedService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadDropDown();
  }
  ngOnChanges(){
    this.initForm();
    this.loadHospitalSelected();
  }
  initForm(){
    this.hospitalForm = new FormGroup({
      id: new FormControl({ value: ''}),
      name: new FormControl('', [Validators.required]), 
      address: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
      colorMarker: new FormControl(''),
      colorTextoMarker: new FormControl(''),
      options: new FormControl(''),
      atentionLevel: new FormControl(''),
      healthInsurances: new FormControl(''),
      accidentOrDiseases: new FormControl(''),
      beds: new FormControl(''),
    }); 
  }
  loadHospitalSelected(){ 
    console.log(this.hospitalSelected);
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalForm.patchValue({ 
        id: this.hospitalSelected.id,
        name: this.hospitalSelected.name, 
        address: this.hospitalSelected.address, 
        locality: this.hospitalSelected.locality, 
        phone: this.hospitalSelected.phone,
        lat: this.hospitalSelected.location.lat, 
        lng: this.hospitalSelected.location.lng, 
        colorMarker: this.hospitalSelected.colorMarker, 
        colorTextoMarker: this.hospitalSelected.colorTextoMarker, 
        options: this.hospitalSelected.options, 
        atentionLevel: this.hospitalSelected.atentionLevel, 
        healthInsurances: this.hospitalSelected.healthInsurances, 
        accidentOrDiseases: this.hospitalSelected.accidentOrDiseases, 
        beds: this.hospitalSelected.beds, 
      })
    }
  }

  onSubmit(){
    if(this.inputType===InputType.create){
      this.add.emit(this.hospitalForm.value);
    } else if(this.inputType===InputType.edit){
      this.edit.emit(this.hospitalForm.value);
    } 
  }
  loadDropDown(){
    this.getAtentionLevel();
    this.getHealthInsurances();
  }
  getAtentionLevel(){
    this.hospitalService.getAtentionLevel().subscribe({
      next: res => {
      this.dataAtentionLevel = res;
      },
    });  
  }
  getHealthInsurances(){
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res => {
      this.dataHealthInsurance = res.healthInsurances;
      },
    });  
  }
  getBeds(){
    this.bedService.getBeds().subscribe({
      next: res => {
      this.dataBed = res.beds;
      }, 
    });  
  }
  setButtonText(){
    return this.inputType===InputType.edit ? 'Actualizar': 'Agregar';
  }
}
