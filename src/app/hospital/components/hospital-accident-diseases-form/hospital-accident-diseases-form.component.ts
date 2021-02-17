import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccidentDiseasesService } from '../../../accident-diseases/services/accident-diseases.service'
import { Hospital } from '../../models/hospital';  
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-hospital-accident-diseases-form',
  templateUrl: './hospital-accident-diseases-form.component.html',
  styleUrls: ['./hospital-accident-diseases-form.component.css']
})
export class HospitalAccidentDiseasesFormComponent implements OnInit {

  @Input() hospitalSelected: Hospital;
  @Input() dataHospital: Hospital[];
  @Output() add = new EventEmitter();
  hospitalAccidentOrDiseasesForm: FormGroup; 
  dataAccidentOrDiseases: AccidentOrDiseases[]; 

  constructor(
    private accidentDiseasesService : AccidentDiseasesService, 
    private commonService: CommonService
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
    this.hospitalAccidentOrDiseasesForm = new FormGroup({
      idHospital: new FormControl({ value: ''}),
      idAccidentOrDisease: new FormControl('', [Validators.required])
    }); 
  }
  loadHospitalSelected(){ 
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalAccidentOrDiseasesForm.patchValue({ 
        idHospital: this.hospitalSelected.id
      })
    }
  }
  onSubmit(){
    this.add.emit(this.hospitalAccidentOrDiseasesForm.value);
  }
  loadDropDown(){
    this.getAllAccidentsOrDiseases();
  }
  getAllAccidentsOrDiseases(){
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        console.log('res',res);
        this.dataAccidentOrDiseases = res.AccidentOrDiseases;
      },
      error: err => {
        console.log(err);
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar la cama','Cerrar');
       } 
    });  
  }
}

 