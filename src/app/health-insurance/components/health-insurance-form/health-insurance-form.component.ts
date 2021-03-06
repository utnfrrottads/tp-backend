import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { HealthInsurance } from '../../models/health-insurance';
import { HealthInsuranceService } from '../../services/health-insurance.service';

@Component({
  selector: 'app-health-insurance-form',
  templateUrl: './health-insurance-form.component.html',
  styleUrls: ['./health-insurance-form.component.css']
})
export class HealthInsuranceFormComponent implements OnInit, OnChanges {


  @Input() inputType: InputType;
  @Input() healthInsuranceSelected: HealthInsurance;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  healthInsuranceForm: FormGroup;

  constructor(
    private healthInsuranceService: HealthInsuranceService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges(): void {
    this.initForm();
    this.loadHealthInsuranceSelected();
  }
  initForm(): void {
    this.healthInsuranceForm = new FormGroup({
      id: new FormControl(''),
      legalName: new FormControl('', [Validators.required]),
      fantasyName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }
  loadHealthInsuranceSelected(): void {
    if (this.healthInsuranceSelected !== undefined && this.healthInsuranceSelected.id !== null && this.healthInsuranceSelected.id !== '') {
      this.healthInsuranceForm.patchValue({
        id: this.healthInsuranceSelected.id,
        legalName: this.healthInsuranceSelected.legalName,
        fantasyName: this.healthInsuranceSelected.fantasyName,
        phone: this.healthInsuranceSelected.phone
      });
    }
  }

  onSubmit(): void {
    if (this.inputType === InputType.create){
      this.add.emit(this.healthInsuranceForm.value);
    } else if (this.inputType === InputType.edit){
      this.edit.emit(this.healthInsuranceForm.value);
    }
  }
  setButtonText(): string{
    return this.inputType === InputType.edit ? 'Actualizar' : 'Agregar';
  }
  checkFieldError(field: string): boolean{
    return this.healthInsuranceForm.controls[field].touched
        && this.healthInsuranceForm.controls[field].invalid;
  }
  checkFieldRequiredError(field: string): boolean{
    return this.healthInsuranceForm.controls[field].errors.required;
  }
}
