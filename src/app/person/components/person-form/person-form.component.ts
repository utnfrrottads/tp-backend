import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { BloodType, Gender, Person } from '../../models/person';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Input() inputType: InputType;
  @Input() personSelected: Person;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  personForm: FormGroup;
  dataHealthInsurance: HealthInsurance[];
  dataGender: Gender[];
  dataBloodType: BloodType[];
  maxDate: Date;
  hide = true;


  constructor(
    private personService: PersonService, 
    private healthInsuranceService: HealthInsuranceService
  ) {
    const now = new Date();
    this.maxDate = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDay());
  }

  ngOnInit() {
    this.initForm();
    this.loadDropDown();
  }
  ngOnChanges(){
    this.initForm();
    this.loadPersonSelected();
  }
  initForm(){
    this.personForm = new FormGroup({
      id: new FormControl({ value: ''}),
      dni: new FormControl('', [Validators.required]), 
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      bornDate: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      bloodType: new FormControl(''),
      emergencyContact: new FormControl(''),
      nurseWorkId: new FormControl(''),
      user: new FormControl(''),
      password: new FormControl(''),
      healthInsurances: new FormControl(''),
    });
  }
  loadPersonSelected(){ 
    if (this.personSelected !== undefined && this.personSelected.id !== null && this.personSelected.id !== '') {
      this.personForm.patchValue({ 
        id: this.personSelected.id,
        dni: this.personSelected.dni, 
        firstName: this.personSelected.firstName,
        lastName: this.personSelected.lastName,
        bornDate: this.personSelected.bornDate,
        phone: this.personSelected.phone,
        bloodType: this.personSelected.bloodType,
        nurseWorkId: this.personSelected.nurseWorkId,
        user: this.personSelected.user,
        password: this.personSelected.password,
        healthInsurances: this.personSelected.healthInsurances,
      })
    }
  }

  onSubmit(){
    if(this.inputType===InputType.create){
      this.add.emit(this.personForm.value);
    } else if(this.inputType===InputType.edit){
      this.edit.emit(this.personForm.value);
    } 
  }
  loadDropDown(){
    this.getBloodTypes(); 
    this.getHealthInsurances();
    this.getGenders();
  }
  getHealthInsurances(){
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res => {
      this.dataHealthInsurance = res.healthInsurances;
      }, 
    });  
  }
  getBloodTypes(){
    this.personService.getBloodTypes().subscribe({
      next: res => {
      this.dataBloodType = res;
      }, 
    });  
  }
  getGenders(){
    this.personService.getGenders().subscribe({
      next: res => {
      this.dataGender = res;
      }, 
    });  
  }
  setButtonText(){
    return this.inputType===InputType.edit ? 'Actualizar': 'Agregar';
  }
}
