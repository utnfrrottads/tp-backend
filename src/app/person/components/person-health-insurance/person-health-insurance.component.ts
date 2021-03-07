import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';
import { Person, PersonHealthInsurance, PersonHealthInsuranceResult } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-health-insurance',
  templateUrl: './person-health-insurance.component.html',
  styleUrls: ['./person-health-insurance.component.css']
})
export class PersonHealthInsuranceComponent implements OnInit, OnChanges {

  @Output() personHealthInsuranceAdd: PersonHealthInsurance;


  @Input() personSelected: Person;
  @Output() add = new EventEmitter();
  personHealthInsuranceForm: FormGroup;
  dataHealthInsurance: HealthInsurance[];

  constructor(
    private healthInsuranceService: HealthInsuranceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropDown();
  }
  ngOnChanges(): void {
    this.initForm();
    this.loadHospitalSelected();
  }
  initForm(): void {
    this.personHealthInsuranceForm = new FormGroup({
      idPerson: new FormControl('', [Validators.required]),
      idHealthInsurance: new FormControl('', [Validators.required])
    });
  }
  loadHospitalSelected(): void {
    if (this.personSelected !== undefined && this.personSelected.id !== null && this.personSelected.id !== '') {
      this.personHealthInsuranceForm.patchValue({
        idPerson: this.personSelected.id
      });
    }
  }
  onSubmit(): void {
    this.add.emit(this.personHealthInsuranceForm.value);
  }
  loadDropDown(): void {
    this.getHealthInsurances();
  }
  getHealthInsurances(): void {
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res => {
      this.dataHealthInsurance = res.healthInsurances;
      },
    });
  }
  checkFieldError(field: string): boolean{
    return this.personHealthInsuranceForm.controls[field].touched
        && this.personHealthInsuranceForm.controls[field].invalid;
  }
  checkFieldRequiredError(field: string): boolean{
    return this.personHealthInsuranceForm.controls[field].errors.required;
  }
}
