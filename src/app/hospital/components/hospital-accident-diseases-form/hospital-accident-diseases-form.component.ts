import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccidentDiseasesService } from '../../../accident-diseases/services/accident-diseases.service'
import { Hospital } from '../../models/hospital';  
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';

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
    private accidentDiseasesService : AccidentDiseasesService
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
    this.getAccidentOrDiseases();
  }
  getAccidentOrDiseases(){
    this.accidentDiseasesService.getAccidentOrDiseases().subscribe({
      next: res => {
        console.log(res.accidentOrDiseases)
        this.dataAccidentOrDiseases = res.accidentOrDiseases;
      },
    });  
  }

}
