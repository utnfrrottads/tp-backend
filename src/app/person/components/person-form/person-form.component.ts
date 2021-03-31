import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
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
export class PersonFormComponent implements OnInit, OnChanges {

  @Input() inputType: InputType;
  @Input() personSelected: Person;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  personForm: FormGroup;
  dataGender: Gender[];
  dataBloodType: BloodType[];
  maxDate: Date;
  hide = true;
  personType = 'Paciente';
  dataPersonType = [
    { personType : 'Paciente' },
    { personType : 'Contacto emergencia' }];

  constructor(
    private personService: PersonService
  ) {
    const now = new Date();
    this.maxDate = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDay());
  }

  ngOnInit(): void{
    this.initForm();
    this.loadDropDown();
  }
  ngOnChanges(): void{
    this.initForm();
    this.loadPersonSelected();
  }
  initForm(): void{
    this.personForm = new FormGroup({
      id: new FormControl(''),
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
      idHealthInsurance: new FormControl(''),
    });
  }
  loadPersonSelected(): void{
    if (this.personSelected !== undefined && this.personSelected.id !== null && this.personSelected.id !== '') {
      this.personForm.patchValue({
        id: this.personSelected.id,
        dni: this.personSelected.dni,
        firstName: this.personSelected.firstName,
        lastName: this.personSelected.lastName,
        bornDate: this.personSelected.bornDate,
        gender: this.personSelected.gender,
        phone: this.personSelected.phone,
        bloodType: this.personSelected.bloodType,
        nurseWorkId: this.personSelected.nurseWorkId,
        user: this.personSelected.user,
        password: this.personSelected.password,
        healthInsurances: this.personSelected.healthInsurances,
        idHealthInsurance: this.personSelected.idHealthInsurance
      });
    }
  }

  onSubmit(): void{
    if (this.inputType === InputType.create){
      this.add.emit(this.personForm.value);
    } else if (this.inputType === InputType.edit){
      this.edit.emit(this.personForm.value);
    }
  }
  loadDropDown(): void{
    this.getBloodTypes();
    this.getGenders();
  }
  getBloodTypes(): void{
    this.personService.getBloodTypes().subscribe({
      next: res => {
      this.dataBloodType = res;
      }
    });
  }
  getGenders(): void{
    this.personService.getGenders().subscribe({
      next: res => {
      this.dataGender = res;
      }
    });
  }
  setButtonText(): string{
    return this.inputType === InputType.edit ? 'Actualizar' : 'Agregar';
  }
  checkFieldError(field: string): boolean{
    return this.personForm.controls[field].touched
        && this.personForm.controls[field].invalid;
  }
  checkFieldRequiredError(field: string): boolean{
    return this.personForm.controls[field].errors.required;
  }
}
