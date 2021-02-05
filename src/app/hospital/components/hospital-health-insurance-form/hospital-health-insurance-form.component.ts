import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HealthInsuranceService } from '../../../health-insurance/services/health-insurance.service'; 
import { Hospital } from '../../models/hospital'; 
import { HealthInsurance } from '../../../health-insurance/models/health-insurance'; 

@Component({
  selector: 'app-hospital-health-insurance-form',
  templateUrl: './hospital-health-insurance-form.component.html',
  styleUrls: ['./hospital-health-insurance-form.component.css']
})
export class HospitalHealthInsuranceFormComponent implements OnInit {

  @Input() hospitalSelected: Hospital;
  @Input() dataHospital: Hospital[];
  @Output() add = new EventEmitter();
  hospitalHealthInsuranceForm: FormGroup; 
  dataHealthInsurance: HealthInsurance[]; 

  constructor(
    private healthInsuranceService : HealthInsuranceService
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
    this.hospitalHealthInsuranceForm = new FormGroup({
      idHospital: new FormControl({ value: ''}),
      idHealthInsurance: new FormControl('', [Validators.required])
    }); 
  }
  loadHospitalSelected(){ 
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalHealthInsuranceForm.patchValue({ 
        idHospital: this.hospitalSelected.id,
        hospitalName: this.hospitalSelected.name
      })
    }
  }

  onSubmit(){
    this.add.emit(this.hospitalHealthInsuranceForm.value);
  }
  loadDropDown(){
    this.getHealthInsurances();
  }
  getHealthInsurances(){
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: res => {
      this.dataHealthInsurance = res.healthInsurances;
      },
    });  
  } 
}
