import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hospital } from '../../models/hospital';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html'
})
export class HospitalListComponent{

  @Input() dataHospital: Hospital[];   
  @Output() hospitalSelected = new EventEmitter();
  @Output() hospitalDeleted = new EventEmitter();
  displayedColumns: string[] = [
    'name', 'address',
    'locality',
    'phone',
    'atentionLevel',
    'actions'];  

  editHospital(hospital: Hospital){
    this.hospitalSelected.emit(hospital);
  }
  deleteHospital(hospital: Hospital) {
    this.hospitalDeleted.emit(hospital);
  }

}
