import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccidentDiseasesService } from '../../../accident-diseases/services/accident-diseases.service';
import { Hospital } from '../../models/hospital';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-hospital-accident-diseases-form',
  templateUrl: './hospital-accident-diseases-form.component.html',
  styleUrls: ['./hospital-accident-diseases-form.component.css']
})
export class HospitalAccidentDiseasesFormComponent implements OnInit, OnChanges {

  @Input() hospitalSelected: Hospital;
  @Input() dataHospital: Hospital[];
  @Output() add = new EventEmitter();
  hospitalAccidentOrDiseasesForm: FormGroup;
  dataAccidentOrDiseases: AccidentOrDiseases[];

  constructor(
    private accidentDiseasesService: AccidentDiseasesService,
    private commonService: CommonService
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
    this.hospitalAccidentOrDiseasesForm = new FormGroup({
      idHospital: new FormControl(''),
      idAccidentOrDisease: new FormControl('', [Validators.required])
    });
  }
  loadHospitalSelected(): void {
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalAccidentOrDiseasesForm.patchValue({
        idHospital: this.hospitalSelected.id
      });
    }
  }
  onSubmit(): void {
    this.add.emit(this.hospitalAccidentOrDiseasesForm.value);
  }
  loadDropDown(): void {
    this.getAllAccidentsOrDiseases();
  }
  getAllAccidentsOrDiseases(): void {
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        this.dataAccidentOrDiseases = res.accidentOrDiseases;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar la cama', 'Cerrar');
       }
    });
  }
}
