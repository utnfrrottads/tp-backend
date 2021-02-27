import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HospitalAccidentOrDiseases } from 'src/app/hospital/models/hospital';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../../models/accidentOrDiseases';

@Component({
  selector: 'app-accident-diseases-list',
  templateUrl: './accident-diseases-list.component.html'
})
export class AccidentDiseasesListComponent {

  @Input() allowEdit = false;
  @Input() allowDelete = false;
  @Input() allowSelect = false;
  @Input() dataAccidentOrDisease: HospitalAccidentOrDiseases[];
  @Output() accidentOrDiseaseDeleted = new EventEmitter();
  @Output() accidentOrDiseaseSelected = new EventEmitter();
  displayedColumns: string[] = ['description', 'actions'];

  deleteHad(accidentOrDiseases: AccidentOrDiseases): void{
    this.accidentOrDiseaseDeleted.emit(accidentOrDiseases);
  }
  editHad(accidentOrDiseases: AccidentOrDiseases): void {
    this.accidentOrDiseaseSelected.emit(accidentOrDiseases);
  }
  selectHad(accidentOrDiseases: AccidentOrDiseases): void {
    this.accidentOrDiseaseSelected.emit(accidentOrDiseases);
  }
}
