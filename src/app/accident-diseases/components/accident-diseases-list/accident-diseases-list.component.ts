import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HospitalAccidentOrDiseases } from 'src/app/hospital/models/hospital';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../../models/accidentOrDiseases';

@Component({
  selector: 'app-accident-diseases-list',
  templateUrl: './accident-diseases-list.component.html'
})
export class AccidentDiseasesListComponent {

  @Input() allowEdit: boolean = false;   
  @Input() allowDelete: boolean = false;
  @Input() dataAccidentOrDisease: HospitalAccidentOrDiseases[];  
  @Output() accidentOrDiseaseDeleted = new EventEmitter();  
  displayedColumns: string[] = ['description', 'actions'];

  // deleteHospitalHealthInsurance(hospitalHealthInsurances: HospitalHealthInsurances) {
  //   this.hospitalHealthInsuranceDeleted.emit(hospitalHealthInsurances);
  // }

  deleteHad(accidentOrDiseases: AccidentOrDiseases){
    this.accidentOrDiseaseDeleted.emit(accidentOrDiseases);
  }


}
