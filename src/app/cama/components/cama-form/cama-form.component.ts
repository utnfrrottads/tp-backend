import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { BedType, BedStatus, Bed, BedSubType } from '../../models/bed';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { EfectorService } from 'src/app/efector/services/efector.service';
import { Efector } from 'src/app/efector/model/efector';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent implements OnInit {
  
  bedForm: FormGroup;
  dataBedType: BedType[];
  dataBedSubType: BedSubType[];
  dataBedStatus: BedStatus[];
  dataHospital: Efector[];
  @Input() inputType: InputType;
  @Input() bedSelected: Bed; 

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private camaService: CamaService, 
    private hospitalService: EfectorService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadDropDown();
    this.getHospitals();
  }
  ngOnChanges(){
    this.initForm();
    this.loadCamaSelected();
  }
  initForm(){
    this.bedForm = new FormGroup({
      id: new FormControl({ value: ''}),
      description: new FormControl('', [Validators.required]), 
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      subtype: new FormControl('', [Validators.required]),
      idHospital: new FormControl('', [Validators.required]),
      hospitalName: new FormControl('')
    }); 
  }
  loadCamaSelected(){ 
    if (this.bedSelected !== undefined && this.bedSelected.id !== null && this.bedSelected.id !== '') {
      this.bedForm.patchValue({ 
        id: this.bedSelected.id,
        description: this.bedSelected.description, 
        type: this.bedSelected.type,
        subtype: this.bedSelected.subtype,
        status: this.bedSelected.status,
        idHospital: this.bedSelected.idHospital,
        hospitalName: this.bedSelected.hospitalName
      })
    }
  }

  onSubmit(){  
    console.log('onSubmit');
    if(this.inputType===InputType.create){
      this.add.emit(this.bedForm.value);
    } else if(this.inputType===InputType.edit){
      this.edit.emit(this.bedForm.value);
    } 
  }
  reset() {
    this.bedForm.reset();
  }

  loadDropDown(){
    this.loadTipoCama();
    this.loadSubTipoCama();
    this.loadEstadoCama();
  }
  loadTipoCama(){
    this.camaService.getTipoCama().subscribe({
      next: res => {
      this.dataBedType = res;
      },
    });  
  }
  loadSubTipoCama(){
    this.camaService.getSubTipoCama().subscribe({
      next: res => {
      this.dataBedSubType = res;
      },
    });  
  }
  loadEstadoCama(){
    this.camaService.getEstadoCama().subscribe({
      next: res => {
      this.dataBedStatus = res;
      }, 
    });  
  }
  getHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: res => {
      this.dataHospital = res.hospitals;
      }, 
    });  
  }
  setButtonText(){
    return this.inputType===InputType.edit ? 'Actualizar': 'Agregar';
  }
}