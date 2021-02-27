import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { BedService } from '../../../bed/services/bed.service';
import { AtentionLevel, Hospital } from '../../models/hospital';
import { InputType } from '../../../common/models/typeInputEnum';
import { Bed } from '../../../bed/models/bed';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.css']
})
export class HospitalFormComponent implements OnInit, OnChanges {


  @Input() inputType: InputType;
  @Input() hospitalSelected: Hospital;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  hospitalForm: FormGroup;
  dataAtentionLevel: AtentionLevel[];
  dataBed: Bed[];
  dataAccidentOrDiseases: AccidentOrDiseases[];

  constructor(
    private hospitalService: HospitalService,
    private bedService: BedService,
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
    this.hospitalForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      options: new FormControl(''),
      atentionLevel: new FormControl(''),
      healthInsurances: new FormControl(''),
      accidentOrDiseases: new FormControl(''),
      beds: new FormControl(''),
    });
  }
  loadHospitalSelected(): void {
    if (this.hospitalSelected !== undefined && this.hospitalSelected.id !== null && this.hospitalSelected.id !== '') {
      this.hospitalForm.patchValue({
        id: this.hospitalSelected.id,
        name: this.hospitalSelected.name,
        address: this.hospitalSelected.address,
        locality: this.hospitalSelected.locality,
        phone: this.hospitalSelected.phone,
        latitude: this.hospitalSelected.location.latitude,
        longitude: this.hospitalSelected.location.longitude,
        options: this.hospitalSelected.options,
        atentionLevel: this.hospitalSelected.atentionLevel,
        healthInsurances: this.hospitalSelected.healthInsurances,
        accidentOrDiseases: this.hospitalSelected.accidentOrDiseases,
        beds: this.hospitalSelected.beds,
      });
    }
  }

  onSubmit(): void {
    if (this.inputType === InputType.create){
      this.add.emit(this.hospitalForm.value);
    } else if (this.inputType === InputType.edit){
      this.edit.emit(this.hospitalForm.value);
    }
  }
  loadDropDown(): void {
    this.getAtentionLevel();
  }
  getAtentionLevel(): void {
    this.hospitalService.getAtentionLevel().subscribe({
      next: res => {
      this.dataAtentionLevel = res;
      },
    });
  }
  getBeds(): void {
    this.bedService.getBeds().subscribe({
      next: res => {
      this.dataBed = res.beds;
      },
    });
  }
  setButtonText(): string {
    return this.inputType === InputType.edit ? 'Actualizar' : 'Agregar';
  }
}
