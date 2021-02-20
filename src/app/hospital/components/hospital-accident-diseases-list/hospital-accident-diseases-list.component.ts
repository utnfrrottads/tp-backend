import { Component, Input, OnInit } from '@angular/core';
import { HospitalAccidentOrDiseases } from '../../models/hospital';

@Component({
  selector: 'app-hospital-accident-diseases-list',
  templateUrl: './hospital-accident-diseases-list.component.html'
})
export class HospitalAccidentDiseasesListComponent{

  @Input() dataHospitalAccidentOrDisease: HospitalAccidentOrDiseases[];    
  displayedColumns: string[] = ['description', 'actions'];

  // deleteHospitalHealthInsurance(hospitalHealthInsurances: HospitalHealthInsurances) {
  //   this.hospitalHealthInsuranceDeleted.emit(hospitalHealthInsurances);
  // }

  deleteHad(){
    alert("Funcionalidad no implementada");
  }

}
