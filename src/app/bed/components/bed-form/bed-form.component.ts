import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BedService } from '../../services/bed.service';
import { BedType, BedStatus, Bed, BedSubType } from '../../models/bed';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { HospitalService } from 'src/app/hospital/services/hospital.service';
import { Hospital } from 'src/app/hospital/models/hospital';

@Component({
  selector: 'app-bed-form',
  templateUrl: './bed-form.component.html',
  styleUrls: ['./bed-form.component.css']
})
export class BedFormComponent implements OnInit, OnChanges {

  @Input() inputType: InputType;
  @Input() bedSelected: Bed;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  bedForm: FormGroup;
  dataBedType: BedType[];
  dataBedSubType: BedSubType[];
  dataBedStatus: BedStatus[];
  dataHospital: Hospital[];

  constructor(
    private bedService: BedService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropDown();
    this.getHospitals();
  }
  ngOnChanges(): void {
    this.initForm();
    this.loadBedSelected();
  }
  initForm(): void {
    this.bedForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      subtype: new FormControl('', [Validators.required]),
      idHospital: new FormControl('', [Validators.required]),
      hospitalName: new FormControl('')
    });
  }
  loadBedSelected(): void {
    if (this.bedSelected !== undefined && this.bedSelected.id !== null && this.bedSelected.id !== '') {
      this.bedForm.patchValue({
        id: this.bedSelected.id,
        description: this.bedSelected.description,
        type: this.bedSelected.type,
        subtype: this.bedSelected.subtype,
        status: this.bedSelected.status,
        idHospital: this.bedSelected.idHospital,
        hospitalName: this.bedSelected.hospitalName
      });
    }
  }

  onSubmit(): void {
    if (this.inputType === InputType.create){
      this.add.emit(this.bedForm.value);
    } else if (this.inputType === InputType.edit){
      this.edit.emit(this.bedForm.value);
    }
  }
  loadDropDown(): void {
    this.loadBedType();
    this.loadBedSubType();
    this.loadBedStatus();
  }
  loadBedType(): void {
    this.bedService.getBedType().subscribe({
      next: res => {
      this.dataBedType = res;
      }
    });
  }
  loadBedSubType(): void {
    this.bedService.getBedSubType().subscribe({
      next: res => {
      this.dataBedSubType = res;
      }
    });
  }
  loadBedStatus(): void {
    this.bedService.getBedStatus().subscribe({
      next: res => {
      this.dataBedStatus = res;
      }
    });
  }
  getHospitals(): void {
    this.hospitalService.getHospitals().subscribe({
      next: res => {
      this.dataHospital = this.hospitalService.getFormatOkFrontendHospital(res.hospitals);
      }
    });
  }
  setButtonText(): string {
    return this.inputType === InputType.edit ? 'Actualizar' : 'Agregar';
  }
}
