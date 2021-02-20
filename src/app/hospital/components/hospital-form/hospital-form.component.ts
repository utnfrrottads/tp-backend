import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { HealthInsuranceService } from '../../../health-insurance/services/health-insurance.service';
import { BedService } from '../../../cama/services/bed.service';
import { AtentionLevel, Hospital } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';  
import { HealthInsurance } from '../../../health-insurance/models/health-insurance';
import { Bed } from '../../../cama/models/bed';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { AccidentDiseasesService } from 'src/app/accident-diseases/services/accident-diseases.service';

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
  dataAtentionLevel: AtentionLevel[];
  dataBed: Bed[];
  dataAccidentOrDiseases: AccidentOrDiseases[];

  constructor( 
    private hospitalService: HospitalService,
    private healthInsuranceService : HealthInsuranceService,
    private bedService: BedService,
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
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      options: new FormControl(''),
      atentionLevel: new FormControl(''),
      healthInsurances: new FormControl(''),
      accidentOrDiseases: new FormControl(''),
      beds: new FormControl(''),
    }); 
  }
  loadHospitalSelected(){
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalForm.patchValue({ 
        id: this.hospitalSelected.id,
        name: this.hospitalSelected.name, 
        address: this.hospitalSelected.address, 
        locality: this.hospitalSelected.locality, 
        phone: this.hospitalSelected.phone,
        latitude: this.hospitalSelected.location.latitude, 
        longitude: this.hospitalSelected.location.longitude,
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
  }
  getAtentionLevel(){
    this.hospitalService.getAtentionLevel().subscribe({
      next: res => {
      this.dataAtentionLevel = res;
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
