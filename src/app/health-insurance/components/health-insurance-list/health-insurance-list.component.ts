import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthInsurance } from '../../models/health-insurance';

@Component({
  selector: 'app-health-insurance-list',
  templateUrl: './health-insurance-list.component.html'
})
export class HealthInsuranceListComponent {

  @Input() allowEdit: boolean = false;   
  @Input() allowDelete: boolean = false;
  @Input() dataHealthInsurance: HealthInsurance[];   
  @Output() healthInsuranceSelected = new EventEmitter();
  @Output() healthInsuranceDeleted = new EventEmitter();
  displayedColumns: string[] = ['legalName', 'fantasyName', 'phone', 'actions'];
 
  editHealthInsurance(healthInsurance: HealthInsurance){
    this.healthInsuranceSelected.emit(healthInsurance);
  }
  deleteHealthInsurance(healthInsurance: HealthInsurance) {
    this.healthInsuranceDeleted.emit(healthInsurance);
  }
}
