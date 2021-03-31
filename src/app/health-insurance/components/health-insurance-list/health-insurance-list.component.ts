import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthInsurance } from '../../models/health-insurance';

@Component({
  selector: 'app-health-insurance-list',
  templateUrl: './health-insurance-list.component.html'
})
export class HealthInsuranceListComponent {

  @Input() allowEdit = false;
  @Input() allowDelete = false;
  @Input() dataHealthInsurance: HealthInsurance[];
  @Output() healthInsuranceSelected = new EventEmitter();
  @Output() healthInsuranceDeleted = new EventEmitter();
  displayedColumns: string[] = ['legalName', 'fantasyName', 'phone', 'actions'];

  editHealthInsurance(healthInsurance: HealthInsurance): void {
    this.healthInsuranceSelected.emit(healthInsurance);
  }
  deleteHealthInsurance(healthInsurance: HealthInsurance): void {
    this.healthInsuranceDeleted.emit(healthInsurance);
  }
}
