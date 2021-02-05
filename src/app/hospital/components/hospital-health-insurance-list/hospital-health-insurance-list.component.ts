import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hospital, HospitalHealthInsurances } from '../../models/hospital';

@Component({
  selector: 'app-hospital-health-insurance-list',
  templateUrl: './hospital-health-insurance-list.component.html'
})
export class HospitalHealthInsuranceListComponent{

  @Input() dataHospitalHealthInsurances: HospitalHealthInsurances[];   
  @Output() hospitalHealthInsuranceDeleted = new EventEmitter();
  displayedColumns: string[] = ['name', 'legalName', 'actions'];

  deleteHospitalHealthInsurance(hospitalHealthInsurances: HospitalHealthInsurances) {
    this.hospitalHealthInsuranceDeleted.emit(hospitalHealthInsurances);
  }
}
